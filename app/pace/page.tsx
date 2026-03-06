"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

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

export default function PacePage() {
  const router = useRouter();
  const quiz = useSyncExternalStore(subscribeQuizState, getQuizSnapshot, getQuizServerSnapshot);

  const [pace, setPace] = useState<PaceKey | null>(null);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const navigationTimeoutRef = useRef<number | null>(null);

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
      router.push("/motivation");
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
    </OnboardingShell>
  );
}
