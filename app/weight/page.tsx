"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, useSyncExternalStore } from "react";

import InsightBanner from "@/components/InsightBanner";
import OnboardingShell from "@/components/OnboardingShell";
import PrimaryButton from "@/components/PrimaryButton";
import WeightInputCard from "@/components/WeightInputCard";
import {
  getQuizServerSnapshot,
  getQuizSnapshot,
  setBodyMetrics,
  subscribeQuizState,
} from "@/store/quizStore";

function parseInRange(value: string, min: number, max: number): number | null {
  if (!value) {
    return null;
  }

  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return null;
  }

  if (parsed < min || parsed > max) {
    return null;
  }

  return parsed;
}

export default function WeightPage() {
  const router = useRouter();
  const quiz = useSyncExternalStore(
    subscribeQuizState,
    getQuizSnapshot,
    getQuizServerSnapshot
  );

  const [weight, setWeight] = useState(() =>
    typeof quiz.currentWeightKg === "number" ? String(quiz.currentWeightKg) : ""
  );
  const [height, setHeight] = useState(() =>
    typeof quiz.heightCm === "number" ? String(quiz.heightCm) : ""
  );
  const [submitted, setSubmitted] = useState(false);

  const validWeight = parseInRange(weight, 30, 250);
  const validHeight = parseInRange(height, 120, 220);

  const bothFilled = weight.length > 0 && height.length > 0;
  const bmiReady = validWeight !== null && validHeight !== null;
  const clearlyUnrealistic = bothFilled && !bmiReady;
  const showSharedError = (submitted && bothFilled && !bmiReady) || clearlyUnrealistic;

  const bmi = useMemo(() => {
    if (validWeight === null || validHeight === null) {
      return null;
    }

    const heightM = validHeight / 100;
    const value = validWeight / (heightM * heightM);

    return Math.round(value * 10) / 10;
  }, [validHeight, validWeight]);

  const handleContinue = () => {
    setSubmitted(true);

    if (!bmiReady) {
      return;
    }

    setBodyMetrics(validWeight, validHeight);
    router.push("/desired-weight");
  };

  return (
    <OnboardingShell
      activeStep={1}
      showBack
      onBack={() => router.back()}
      primaryAction={
        <PrimaryButton disabled={!bothFilled} onClick={handleContinue}>
          Continue
        </PrimaryButton>
      }
    >
      <h1 className="display-text age-title">What&apos;s your weight and height?</h1>
      <p className="body-text subtitle-text age-subtitle">This helps personalize your plan.</p>

      <WeightInputCard
        label="Current weight"
        unit="kg"
        value={weight}
        onChange={setWeight}
      />

      <WeightInputCard
        label="Height"
        unit="cm"
        value={height}
        onChange={setHeight}
      />

      {showSharedError ? (
        <p className="small-text weight-shared-error">
          Please enter a realistic weight and height to continue.
        </p>
      ) : null}

      {bmi !== null ? (
        <section className="weight-bmi-section">
          <div className="insight-slot">
            <InsightBanner bmi={bmi} />
          </div>
        </section>
      ) : null}
    </OnboardingShell>
  );
}
