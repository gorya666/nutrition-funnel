"use client";

import { useRouter } from "next/navigation";
import { useSyncExternalStore } from "react";

import Card from "@/components/Card";
import OnboardingShell from "@/components/OnboardingShell";
import PrimaryButton from "@/components/PrimaryButton";
import TimelineGraph from "@/components/TimelineGraph";
import {
  getQuizServerSnapshot,
  getQuizSnapshot,
  setMilestone,
  subscribeQuizState,
} from "@/store/quizStore";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function formatWeight(value: number) {
  return Number.isInteger(value) ? `${value}` : value.toFixed(1);
}

export default function TargetWeightPage() {
  const router = useRouter();
  const { currentWeightKg, heightCm, desiredWeightKg } = useSyncExternalStore(
    subscribeQuizState,
    getQuizSnapshot,
    getQuizServerSnapshot
  );

  if (!currentWeightKg || !heightCm) {
    return (
      <OnboardingShell
        activeStep={5}
        showBack
        onBack={() => router.back()}
        primaryAction={<PrimaryButton onClick={() => router.push("/weight")}>Go back</PrimaryButton>}
      >
        <h1 className="display-text age-title">Your first milestone</h1>
        <p className="body-text subtitle-text age-subtitle">Add your weight and height first to continue.</p>
      </OnboardingShell>
    );
  }

  if (!desiredWeightKg) {
    return (
      <OnboardingShell
        activeStep={5}
        showBack
        onBack={() => router.back()}
        primaryAction={<PrimaryButton onClick={() => router.push("/desired-weight")}>Go back</PrimaryButton>}
      >
        <h1 className="display-text age-title">Your first milestone</h1>
        <p className="body-text subtitle-text age-subtitle">Add your desired weight first to continue.</p>
      </OnboardingShell>
    );
  }

  const goalGapKg = Math.max(currentWeightKg - desiredWeightKg, 1);
  const milestoneLossKg = clamp(Math.round(goalGapKg * 0.25), 1, 3);
  const milestoneWeightKg = Math.round((currentWeightKg - milestoneLossKg) * 10) / 10;
  const weeks = Math.ceil(milestoneLossKg / 0.5);

  const handleContinue = () => {
    setMilestone(milestoneLossKg, milestoneWeightKg);
    router.push("/pace");
  };

  return (
    <OnboardingShell
      activeStep={5}
      showBack
      onBack={() => router.back()}
      primaryAction={<PrimaryButton onClick={handleContinue}>Lock milestone</PrimaryButton>}
    >
      <h1 className="display-text target-screen-title">Your first milestone</h1>
      <p className="body-text subtitle-text target-screen-subtitle">A realistic goal for the next 4–6 weeks.</p>

      <Card className="target-progress-card">
        <p className="target-recommended-number">Reach {formatWeight(milestoneWeightKg)} kg</p>
        <p className="small-text subtitle-text target-support-copy">From {formatWeight(currentWeightKg)} kg</p>
        <p className="small-text subtitle-text target-range-copy">Your full goal is {formatWeight(desiredWeightKg)} kg</p>

        <TimelineGraph
          currentWeightKg={currentWeightKg}
          targetWeightKg={milestoneWeightKg}
          weeksToGoal={weeks}
        />
      </Card>
    </OnboardingShell>
  );
}
