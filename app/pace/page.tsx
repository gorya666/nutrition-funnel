"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import OnboardingShell from "@/components/OnboardingShell";
import PrimaryButton from "@/components/PrimaryButton";
import SelectionCard from "@/components/SelectionCard";
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
    paceLabel: "0.3 kg per week",
    description: "Easier to maintain",
    emoji: "🐢",
  },
  {
    key: "optimal",
    title: "Optimal",
    paceLabel: "0.5 kg per week",
    description: "Balanced and sustainable",
    emoji: "⚖️",
    recommended: true,
  },
  {
    key: "fast",
    title: "Fast",
    paceLabel: "0.7 kg per week",
    description: "More aggressive deficit",
    emoji: "🔥",
  },
];

export default function PacePage() {
  const router = useRouter();
  const quiz = useSyncExternalStore(subscribeQuizState, getQuizSnapshot, getQuizServerSnapshot);

  const [pace, setPace] = useState<PaceKey | null>(quiz.paceKey ?? null);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const navigationTimeoutRef = useRef<number | null>(null);
  const selectedPace = pace ?? quiz.paceKey ?? null;

  const currentWeight = quiz.currentWeightKg ?? 0;
  const desiredWeight = quiz.desiredWeightKg ?? 0;
  const totalGapKg = Math.max(currentWeight - desiredWeight, 1);

  useEffect(() => {
    return () => {
      if (navigationTimeoutRef.current !== null) {
        window.clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, []);

  if (!quiz.currentWeightKg || !quiz.desiredWeightKg) {
    return (
      <OnboardingShell
        activeStep={3}
        showBack
        onBack={() => router.back()}
        primaryAction={<PrimaryButton onClick={() => router.push("/desired-weight")}>Go back</PrimaryButton>}
      >
        <h1 className="display-text age-title">How fast do you want to reach your goal?</h1>
        <p className="body-text subtitle-text age-subtitle">Add your desired weight first to continue.</p>
      </OnboardingShell>
    );
  }

  const handlePaceChange = (nextPace: PaceKey) => {
    if (isAdvancing) {
      return;
    }

    const nextPaceKg = PACE_KG[nextPace];
    const nextWeeksToGoal = Math.ceil(totalGapKg / nextPaceKg);
    const goalDate = new Date();
    goalDate.setDate(goalDate.getDate() + nextWeeksToGoal * 7);

    setPace(nextPace);
    setPacePlan(nextPace, nextPaceKg, goalDate.toISOString());
    setIsAdvancing(true);

    navigationTimeoutRef.current = window.setTimeout(() => {
      router.push("/processing");
    }, 300);
  };

  return (
    <OnboardingShell
      activeStep={3}
      showBack
      onBack={() => router.back()}
    >
      <h1 className="display-text pace-title">How fast do you want to reach your goal?</h1>

      <div className="pace-card-list" role="radiogroup" aria-label="Weight loss pace">
        {PACE_CARDS.map((item) => (
          <SelectionCard
            key={item.key}
            title={`${item.title} · ${item.paceLabel}`}
            subtitle={item.description}
            leadingIcon={item.emoji}
            badgeText={item.recommended ? "Recommended" : undefined}
            selected={selectedPace === item.key}
            role="radio"
            ariaChecked={selectedPace === item.key}
            onClick={() => handlePaceChange(item.key)}
          />
        ))}
      </div>
    </OnboardingShell>
  );
}
