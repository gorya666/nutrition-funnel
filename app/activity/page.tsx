"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";

import OnboardingShell from "@/components/OnboardingShell";
import SelectionCard from "@/components/SelectionCard";
import {
  getQuizServerSnapshot,
  getQuizSnapshot,
  setActivityLevel,
  subscribeQuizState,
  type ActivityLevelKey,
} from "@/store/quizStore";

const ACTIVITY_OPTIONS: Array<{ value: ActivityLevelKey; title: string; emoji: string }> = [
  { value: "not_active", title: "Not very active", emoji: "🛋️" },
  { value: "lightly_active", title: "Lightly active", emoji: "🚶" },
  { value: "moderately_active", title: "Moderately active", emoji: "🏃" },
  { value: "very_active", title: "Very active", emoji: "🔥" },
];

export default function ActivityPage() {
  const router = useRouter();
  const titleId = useId();
  const { activityLevel } = useSyncExternalStore(
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

  const handleSelect = (value: ActivityLevelKey) => {
    if (isAdvancing) {
      return;
    }

    setActivityLevel(value);
    setIsAdvancing(true);

    navigationTimeoutRef.current = window.setTimeout(() => {
      router.push("/weight");
    }, 300);
  };

  return (
    <OnboardingShell
      activeStep={5}
      totalSteps={11}
      showBack
      onBack={() => router.push("/support")}
    >
      <h1 id={titleId} className="display-text age-title">How active are you on a typical day?</h1>
      <p className="body-text subtitle-text age-subtitle">
        This helps us estimate your daily calorie needs.
      </p>

      <div className="selection-list" role="radiogroup" aria-labelledby={titleId}>
        {ACTIVITY_OPTIONS.map((option) => (
          <SelectionCard
            key={option.value}
            title={option.title}
            leadingIcon={option.emoji}
            selected={activityLevel === option.value}
            role="radio"
            ariaChecked={activityLevel === option.value}
            onClick={() => handleSelect(option.value)}
          />
        ))}
      </div>
    </OnboardingShell>
  );
}
