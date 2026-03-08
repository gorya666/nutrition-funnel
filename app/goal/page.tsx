"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import OnboardingShell from "@/components/OnboardingShell";
import SelectionCard from "@/components/SelectionCard";
import {
  getQuizServerSnapshot,
  getQuizSnapshot,
  setMainGoal,
  subscribeQuizState,
  type MainGoalKey,
} from "@/store/quizStore";

const GOAL_OPTIONS: Array<{ value: MainGoalKey; label: string; emoji: string }> = [
  { value: "lose_weight", label: "Lose weight", emoji: "🔥" },
  { value: "maintain_weight", label: "Maintain weight", emoji: "⚖️" },
  { value: "gain_muscle", label: "Gain muscle", emoji: "💪" },
];

export default function GoalPage() {
  const router = useRouter();
  const { mainGoal } = useSyncExternalStore(
    subscribeQuizState,
    getQuizSnapshot,
    getQuizServerSnapshot
  );
  const [isAdvancing, setIsAdvancing] = useState(false);
  const navigationTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (navigationTimeoutRef.current !== null) {
        window.clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, []);

  const handleSelect = (value: MainGoalKey) => {
    if (isAdvancing) {
      return;
    }

    setMainGoal(value);
    setIsAdvancing(true);

    navigationTimeoutRef.current = window.setTimeout(() => {
      router.push("/support");
    }, 300);
  };

  return (
    <OnboardingShell
      activeStep={3}
      totalSteps={11}
      showBack
      onBack={() => router.push("/welcome")}
    >
      <h1 className="display-text age-title">What&apos;s your main goal?</h1>

      <div className="sex-options" role="radiogroup" aria-label="Main goal">
        {GOAL_OPTIONS.map((option) => (
          <SelectionCard
            key={option.value}
            title={option.label}
            leadingIcon={option.emoji}
            selected={mainGoal === option.value}
            role="radio"
            ariaChecked={mainGoal === option.value}
            onClick={() => handleSelect(option.value)}
          />
        ))}
      </div>
    </OnboardingShell>
  );
}
