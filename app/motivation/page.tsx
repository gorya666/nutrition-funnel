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
  subscribeQuizState,
} from "@/store/quizStore";

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function MotivationPage() {
  const router = useRouter();
  const quiz = useSyncExternalStore(subscribeQuizState, getQuizSnapshot, getQuizServerSnapshot);

  if (!quiz.currentWeightKg || !quiz.desiredWeightKg) {
    return (
      <OnboardingShell
        activeStep={4}
        showBack
        onBack={() => router.back()}
        primaryAction={<PrimaryButton onClick={() => router.push("/desired-weight")}>Go back</PrimaryButton>}
      >
        <h1 className="display-text age-title">You want to lose weight</h1>
        <p className="body-text subtitle-text age-subtitle">Add your desired weight first to continue.</p>
      </OnboardingShell>
    );
  }

  const goalLossKg = Math.max(quiz.currentWeightKg - quiz.desiredWeightKg, 1);
  const milestoneLossKg = clamp(Math.round(goalLossKg * 0.25), 1, 3);
  const milestoneWeightKg = quiz.currentWeightKg - milestoneLossKg;
  const selectedPaceKgPerWeek = quiz.paceKgPerWeek ?? 0.5;
  const milestoneWeeks = Math.max(1, Math.ceil(milestoneLossKg / selectedPaceKgPerWeek));

  return (
    <OnboardingShell
      activeStep={4}
      showBack
      onBack={() => router.back()}
      primaryAction={<PrimaryButton onClick={() => router.push("/processing")}>Get my personal plan</PrimaryButton>}
    >
      <h1 className="display-text age-title">You want to lose {goalLossKg}kg</h1>
      <p className="body-text subtitle-text motivation-subtitle">We&apos;ll start with the first {milestoneLossKg}kg</p>
      <p className="small-text subtitle-text motivation-helper">
        At this pace, you&apos;ll reach {Math.round(milestoneWeightKg)} kg in about {milestoneWeeks} weeks
      </p>

      <Card className="target-progress-card">
        <TimelineGraph
          currentWeightKg={quiz.currentWeightKg}
          targetWeightKg={milestoneWeightKg}
          weeksToGoal={milestoneWeeks}
        />
      </Card>
    </OnboardingShell>
  );
}
