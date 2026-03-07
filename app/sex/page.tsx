"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import OnboardingShell from "@/components/OnboardingShell";
import SelectionCard from "@/components/SelectionCard";
import {
  getQuizServerSnapshot,
  getQuizSnapshot,
  setGender,
  subscribeQuizState,
} from "@/store/quizStore";

type SexOption = "female" | "male" | "prefer_not_to_say";

const OPTIONS: Array<{ value: SexOption; label: string; emoji: string }> = [
  { value: "female", label: "Female", emoji: "👩" },
  { value: "male", label: "Male", emoji: "👨" },
  { value: "prefer_not_to_say", label: "Prefer not to say", emoji: "🙂" },
];

export default function SexPage() {
  const router = useRouter();
  const { gender } = useSyncExternalStore(
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

  const handleSelect = (value: SexOption) => {
    if (isAdvancing) {
      return;
    }

    setGender(value);
    setIsAdvancing(true);

    navigationTimeoutRef.current = window.setTimeout(() => {
      router.push("/age");
    }, 300);
  };

  return (
    <OnboardingShell
      activeStep={1}
      showBack
      onBack={() => router.back()}
    >
      <h1 className="title-text sex-title">What&apos;s your sex?</h1>
      <p className="body-text subtitle-text sex-subtitle">
        This helps us personalize your calorie and macro targets.
      </p>
      <p className="title-3-text welcome-question">Select your sex</p>

      <div className="sex-options">
        {OPTIONS.map((option) => (
          <SelectionCard
            key={option.value}
            title={option.label}
            leadingIcon={option.emoji}
            selected={gender === option.value}
            onClick={() => handleSelect(option.value)}
          />
        ))}
      </div>
    </OnboardingShell>
  );
}
