"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import OnboardingShell from "@/components/OnboardingShell";
import OptionCard from "@/components/OptionCard";
import { setGender } from "@/store/quizStore";

type SexOption = "female" | "male" | "prefer_not_to_say";

const OPTIONS: Array<{ value: SexOption; label: string; emoji: string }> = [
  { value: "female", label: "Female", emoji: "👩" },
  { value: "male", label: "Male", emoji: "👨" },
  { value: "prefer_not_to_say", label: "Prefer not to say", emoji: "🙂" },
];

export default function SexPage() {
  const router = useRouter();
  const [selection, setSelection] = useState<SexOption | null>(null);
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

    setSelection(value);
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
          <OptionCard
            key={option.value}
            label={option.label}
            emoji={option.emoji}
            selected={selection === option.value}
            onClick={() => handleSelect(option.value)}
          />
        ))}
      </div>
    </OnboardingShell>
  );
}
