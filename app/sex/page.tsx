"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import OnboardingShell from "@/components/OnboardingShell";
import OptionCard from "@/components/OptionCard";
import PrimaryButton from "@/components/PrimaryButton";

type SexOption = "female" | "male" | "prefer_not_to_say";

const OPTIONS: Array<{ value: SexOption; label: string; emoji: string }> = [
  { value: "female", label: "Female", emoji: "👩" },
  { value: "male", label: "Male", emoji: "👨" },
  { value: "prefer_not_to_say", label: "Prefer not to say", emoji: "🙂" },
];

export default function SexPage() {
  const router = useRouter();
  const [selection, setSelection] = useState<SexOption | null>(null);

  return (
    <OnboardingShell
      activeStep={1}
      showBack
      onBack={() => router.back()}
      primaryAction={
        <PrimaryButton disabled={!selection} onClick={() => router.push("/age")}>
          Continue
        </PrimaryButton>
      }
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
            onClick={() => setSelection(option.value)}
          />
        ))}
      </div>
    </OnboardingShell>
  );
}
