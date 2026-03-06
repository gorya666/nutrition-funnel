"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useSyncExternalStore } from "react";

import OnboardingShell from "@/components/OnboardingShell";
import PrimaryButton from "@/components/PrimaryButton";
import WeightInputCard from "@/components/WeightInputCard";
import {
  getQuizServerSnapshot,
  getQuizSnapshot,
  setDesiredWeight,
  subscribeQuizState,
} from "@/store/quizStore";

function parseInteger(value: string): number | null {
  if (!value) {
    return null;
  }

  const parsed = Number.parseInt(value, 10);
  if (!Number.isFinite(parsed)) {
    return null;
  }

  return parsed;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function DesiredWeightPage() {
  const router = useRouter();
  const { currentWeightKg, heightCm } = useSyncExternalStore(
    subscribeQuizState,
    getQuizSnapshot,
    getQuizServerSnapshot
  );
  const [desiredWeight, setDesiredWeightInput] = useState("");

  const [minHealthyWeight, maxHealthyWeight] = useMemo(() => {
    if (!heightCm) {
      return [40, 80];
    }

    const heightM = heightCm / 100;
    const min = Math.round(18.5 * heightM * heightM);
    const max = Math.round(24.9 * heightM * heightM);
    return [clamp(min, 40, 300), clamp(max, 40, 300)];
  }, [heightCm]);

  if (!currentWeightKg || !heightCm) {
    return (
      <OnboardingShell
        activeStep={4}
        showBack
        onBack={() => router.back()}
        primaryAction={<PrimaryButton onClick={() => router.push("/weight")}>Go back</PrimaryButton>}
      >
        <h1 className="display-text age-title">What weight would you like to reach?</h1>
        <p className="body-text subtitle-text age-subtitle">Add your current weight and height first.</p>
      </OnboardingShell>
    );
  }

  const parsedDesired = parseInteger(desiredWeight);
  const maxAllowed = Math.floor(currentWeightKg - 1);
  const minAllowed = 40;
  const isValid = parsedDesired !== null && parsedDesired >= minAllowed && parsedDesired <= maxAllowed;
  const invalid = desiredWeight.length > 0 && !isValid;

  const handleContinue = () => {
    if (!isValid || parsedDesired === null) {
      return;
    }

    setDesiredWeight(parsedDesired);
    router.push("/target-weight");
  };

  return (
    <OnboardingShell
      activeStep={4}
      showBack
      onBack={() => router.back()}
      primaryAction={
        <PrimaryButton disabled={!isValid} onClick={handleContinue}>
          Continue
        </PrimaryButton>
      }
    >
      <h1 className="display-text age-title">What weight would you like to reach?</h1>
      <p className="body-text subtitle-text age-subtitle">You can adjust this later.</p>

      <WeightInputCard
        label="Target weight"
        unit="kg"
        value={desiredWeight}
        onChange={setDesiredWeightInput}
        invalid={invalid}
        helperText={invalid ? `Enter an integer between ${minAllowed} and ${maxAllowed}` : undefined}
      />

      <p className="small-text subtitle-text desired-weight-hint">
        For your height, a healthy range is {minHealthyWeight}–{maxHealthyWeight} kg
      </p>
    </OnboardingShell>
  );
}
