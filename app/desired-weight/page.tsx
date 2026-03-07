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
  const quiz = useSyncExternalStore(
    subscribeQuizState,
    getQuizSnapshot,
    getQuizServerSnapshot
  );
  const { currentWeightKg, heightCm, desiredWeightKg } = quiz;
  const [desiredWeight, setDesiredWeightInput] = useState(() =>
    typeof desiredWeightKg === "number" ? String(desiredWeightKg) : ""
  );
  const hasCurrentWeight = typeof currentWeightKg === "number";
  const hasHeight = typeof heightCm === "number";

  const recommendedWeightKg = useMemo(() => {
    if (!hasCurrentWeight || !hasHeight) {
      return null;
    }

    const heightM = heightCm / 100;
    const healthyUpperWeightKg = 24.9 * heightM * heightM;
    const healthyMidWeightKg = 21.7 * heightM * heightM;
    const roundedUpper = Math.round(healthyUpperWeightKg);
    const roundedMid = Math.round(healthyMidWeightKg);

    let recommended =
      currentWeightKg <= healthyUpperWeightKg
        ? Math.max(Math.round(currentWeightKg - 3), roundedMid)
        : Math.max(Math.round(currentWeightKg - 5), roundedUpper);

    recommended = Math.min(recommended, Math.round(currentWeightKg - 1));
    recommended = Math.max(recommended, roundedMid);

    return clamp(recommended, 40, 300);
  }, [currentWeightKg, hasCurrentWeight, hasHeight, heightCm]);

  if (!hasCurrentWeight || !hasHeight) {
    return (
      <OnboardingShell
        activeStep={2}
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
  const maxAllowed = hasCurrentWeight ? Math.floor(currentWeightKg - 1) : null;
  const minAllowed = 40;
  const isValid = parsedDesired !== null && maxAllowed !== null && parsedDesired >= minAllowed && parsedDesired <= maxAllowed;
  const invalid = desiredWeight.length > 0 && !isValid;
  const showTooHighError = hasCurrentWeight && parsedDesired !== null && parsedDesired >= currentWeightKg;

  const handleContinue = () => {
    if (!isValid || parsedDesired === null) {
      return;
    }

    setDesiredWeight(parsedDesired);
    router.push("/pace");
  };

  return (
    <OnboardingShell
      activeStep={2}
      showBack
      onBack={() => router.back()}
      primaryAction={
        <PrimaryButton disabled={!isValid} onClick={handleContinue}>
          Continue
        </PrimaryButton>
      }
    >
      <h1 className="display-text age-title">What weight would you like to reach?</h1>
      <p className="body-text subtitle-text age-subtitle">Set a realistic goal you’d feel good reaching.</p>

      <WeightInputCard
        label="Desired weight"
        unit="kg"
        value={desiredWeight}
        onChange={setDesiredWeightInput}
        invalid={invalid}
      />
      {showTooHighError ? (
        <p className="small-text weight-shared-error">Entered weight should be lower than your current weight.</p>
      ) : null}

      {recommendedWeightKg !== null ? (
        <>
          <p className="small-text subtitle-text desired-weight-hint">
            Recommended weight: {recommendedWeightKg} kg
          </p>
        </>
      ) : null}
    </OnboardingShell>
  );
}
