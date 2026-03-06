"use client";

import { useRouter } from "next/navigation";
import { useState, useSyncExternalStore } from "react";

import OnboardingShell from "@/components/OnboardingShell";
import PaceCard from "@/components/PaceCard";
import PrimaryButton from "@/components/PrimaryButton";
import {
  type PaceKey,
  getQuizServerSnapshot,
  getQuizSnapshot,
  setPacePlan,
  subscribeQuizState,
} from "@/store/quizStore";

const PACE_KG: Record<PaceKey, number> = {
  slow: 0.3,
  optimal: 0.5,
  fast: 0.7,
};

const PACE_CARDS: Array<{
  key: PaceKey;
  title: string;
  paceLabel: string;
  description: string;
  emoji: string;
  recommended?: boolean;
}> = [
  {
    key: "slow",
    title: "Slow",
    paceLabel: "0.3 kg / week",
    description: "Easier to maintain",
    emoji: "🐢",
  },
  {
    key: "optimal",
    title: "Optimal",
    paceLabel: "0.5 kg / week",
    description: "Balanced and sustainable",
    emoji: "⚖️",
    recommended: true,
  },
  {
    key: "fast",
    title: "Fast",
    paceLabel: "0.7 kg / week",
    description: "More aggressive deficit",
    emoji: "🔥",
  },
];

function formatWeight(value: number) {
  return Number.isInteger(value) ? `${value}` : value.toFixed(1);
}

export default function PacePage() {
  const router = useRouter();
  const quiz = useSyncExternalStore(subscribeQuizState, getQuizSnapshot, getQuizServerSnapshot);

  const [pace, setPace] = useState<PaceKey | null>(quiz.paceKey ?? null);

  const currentWeight = quiz.currentWeightKg ?? 0;
  const desiredWeight = quiz.desiredWeightKg ?? 0;
  const totalGapKg = Math.max(currentWeight - desiredWeight, 1);

  const paceKgPerWeek = pace ? PACE_KG[pace] : null;
  const weeksToGoal = paceKgPerWeek ? Math.ceil(totalGapKg / paceKgPerWeek) : null;

  const handlePaceChange = (nextPace: PaceKey) => {
    const nextPaceKg = PACE_KG[nextPace];
    const nextWeeks = Math.ceil(totalGapKg / nextPaceKg);
    const nextGoalDate = new Date();
    nextGoalDate.setDate(nextGoalDate.getDate() + nextWeeks * 7);

    setPace(nextPace);
    setPacePlan(nextPace, nextPaceKg, nextGoalDate.toISOString());
  };

  if (!quiz.currentWeightKg || !quiz.desiredWeightKg) {
    return (
      <OnboardingShell
        activeStep={6}
        showBack
        onBack={() => router.back()}
        primaryAction={<PrimaryButton onClick={() => router.push("/desired-weight")}>Go back</PrimaryButton>}
      >
        <h1 className="display-text age-title">How fast do you want to reach your goal?</h1>
        <p className="body-text subtitle-text age-subtitle">Add your desired weight first to continue.</p>
      </OnboardingShell>
    );
  }

  const handleContinue = () => {
    if (!pace || !paceKgPerWeek || !weeksToGoal) {
      return;
    }

    const goalDate = new Date();
    goalDate.setDate(goalDate.getDate() + weeksToGoal * 7);
    setPacePlan(pace, paceKgPerWeek, goalDate.toISOString());
    router.push("/processing");
  };

  return (
    <OnboardingShell
      activeStep={6}
      showBack
      onBack={() => router.back()}
      primaryAction={
        <PrimaryButton disabled={!pace} onClick={handleContinue}>
          Set this pace
        </PrimaryButton>
      }
    >
      <h1 className="display-text pace-title">How fast do you want to reach your goal?</h1>

      <div className="pace-card-list" role="radiogroup" aria-label="Weight loss pace">
        {PACE_CARDS.map((item) => (
          <PaceCard
            key={item.key}
            value={item.key}
            title={item.title}
            paceLabel={item.paceLabel}
            description={item.description}
            emoji={item.emoji}
            recommended={item.recommended}
            selected={pace === item.key}
            onSelect={handlePaceChange}
          />
        ))}
      </div>

      <p className="small-text subtitle-text pace-estimate-copy">
        {pace && weeksToGoal
          ? `At this pace, you'll reach ${formatWeight(desiredWeight)} kg in ~${weeksToGoal} weeks`
          : "Select a pace to see your estimated timeline"}
      </p>
    </OnboardingShell>
  );
}
