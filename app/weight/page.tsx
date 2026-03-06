"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import InsightBanner from "@/components/InsightBanner";
import OnboardingShell from "@/components/OnboardingShell";
import PrimaryButton from "@/components/PrimaryButton";
import WeightInputCard from "@/components/WeightInputCard";
import { setBodyMetrics } from "@/store/quizStore";

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

  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const validWeight = parseInRange(weight, 30, 250);
  const validHeight = parseInRange(height, 120, 220);

  const weightInvalid = weight.length > 0 && validWeight === null;
  const heightInvalid = height.length > 0 && validHeight === null;

  const bmi = useMemo(() => {
    if (validWeight === null || validHeight === null) {
      return null;
    }

    const heightM = validHeight / 100;
    const value = validWeight / (heightM * heightM);

    return Math.round(value * 10) / 10;
  }, [validHeight, validWeight]);

  const handleContinue = () => {
    if (validWeight === null || validHeight === null) {
      return;
    }

    setBodyMetrics(validWeight, validHeight);
    router.push("/desired-weight");
  };

  return (
    <OnboardingShell
      activeStep={3}
      showBack
      onBack={() => router.back()}
      primaryAction={
        <PrimaryButton disabled={validWeight === null || validHeight === null} onClick={handleContinue}>
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
        invalid={weightInvalid}
        helperText={weightInvalid ? "Enter a value between 30 and 250" : undefined}
      />

      <WeightInputCard
        label="Height"
        unit="cm"
        value={height}
        onChange={setHeight}
        invalid={heightInvalid}
        helperText={heightInvalid ? "Enter a value between 120 and 220" : undefined}
      />

      <div className="insight-slot">{bmi !== null ? <InsightBanner bmi={bmi} /> : null}</div>
    </OnboardingShell>
  );
}
