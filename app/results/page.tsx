"use client";

import { useRouter } from "next/navigation";
import { useMemo, useSyncExternalStore } from "react";

import OnboardingShell from "@/components/OnboardingShell";
import PrimaryButton from "@/components/PrimaryButton";
import {
  clearQuizState,
  getQuizServerSnapshot,
  getQuizSnapshot,
  subscribeQuizState,
} from "@/store/quizStore";

function formatWeight(value: number) {
  return Number.isInteger(value) ? `${value}` : value.toFixed(1);
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default function ResultsPage() {
  const router = useRouter();
  const quiz = useSyncExternalStore(subscribeQuizState, getQuizSnapshot, getQuizServerSnapshot);

  const handleStartOver = () => {
    clearQuizState();
    router.push("/welcome");
  };

  const currentWeight = quiz.currentWeightKg ?? 0;
  const desiredWeight = quiz.desiredWeightKg ?? 0;
  const paceKgPerWeek = quiz.paceKgPerWeek ?? 0.5;
  const totalGapKg = Math.max(currentWeight - desiredWeight, 1);

  const goalDateLabel = useMemo(() => {
    const weeksToGoal = Math.ceil(totalGapKg / paceKgPerWeek);
    const next = new Date();
    next.setDate(next.getDate() + weeksToGoal * 7);
    return formatDate(next);
  }, [paceKgPerWeek, totalGapKg]);

  if (!quiz.currentWeightKg || !quiz.desiredWeightKg) {
    return (
      <OnboardingShell activeStep={8} primaryAction={<PrimaryButton onClick={handleStartOver}>Start from beginning</PrimaryButton>}>
        <h1 className="display-text age-title">Your plan is ready</h1>
        <p className="body-text subtitle-text age-subtitle">Add your desired weight to generate your full timeline.</p>
      </OnboardingShell>
    );
  }

  return (
    <OnboardingShell activeStep={8} primaryAction={<PrimaryButton onClick={handleStartOver}>Start from beginning</PrimaryButton>}>
      <h1 className="display-text age-title">Reach {formatWeight(desiredWeight)} kg by {goalDateLabel}</h1>
      <p className="body-text subtitle-text age-subtitle">
        This is a placeholder results screen. We can build the full plan reveal next.
      </p>
    </OnboardingShell>
  );
}
