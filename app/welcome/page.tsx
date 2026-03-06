"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import OnboardingShell from "@/components/OnboardingShell";
import OptionCard from "@/components/OptionCard";
import PrimaryButton from "@/components/PrimaryButton";
import { setGender, type GenderKey } from "@/store/quizStore";

const OPTIONS: Array<{ value: GenderKey; label: string }> = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "prefer_not_to_say", label: "Prefer not to say" },
];

export default function WelcomePage() {
  const router = useRouter();
  const [selection, setSelection] = useState<GenderKey | null>(null);

  const handleContinue = () => {
    if (!selection) {
      return;
    }

    setGender(selection);
    router.push("/age");
  };

  return (
    <OnboardingShell
      activeStep={0}
      showBack={false}
      primaryAction={
        <PrimaryButton disabled={!selection} onClick={handleContinue}>
          Continue
        </PrimaryButton>
      }
    >
      <h1 className="title-text welcome-title">
        Snap your meals and <span className="welcome-title-emphasis">stay in control</span> of calories.
      </h1>
      <p className="body-text subtitle-text welcome-subtitle">
        Take a quick quiz to get your personal calorie target and AI nutrition insights.
      </p>

      <div className="welcome-quiz-section">
        <p className="small-text subtitle-text welcome-meta">1-minute quiz</p>
        <h2 className="secondary-title-text welcome-question">Select your gender to begin</h2>
      </div>

      <div className="sex-options welcome-gender-list">
        {OPTIONS.map((option) => (
          <OptionCard
            key={option.label}
            label={option.label}
            emoji={
              option.value === "male"
                ? "👨"
                : option.value === "female"
                  ? "👩"
                  : "🙂"
            }
            selected={selection === option.value}
            onClick={() => setSelection(option.value)}
          />
        ))}
      </div>
    </OnboardingShell>
  );
}
