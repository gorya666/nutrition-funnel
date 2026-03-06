"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import OnboardingShell from "@/components/OnboardingShell";
import OptionCard from "@/components/OptionCard";
import PrimaryButton from "@/components/PrimaryButton";
import { setAgeBucket, type AgeBucket } from "@/store/quizStore";

const AGE_OPTIONS: Array<{ label: string; value: AgeBucket }> = [
  { label: "Under 18", value: "under18" },
  { label: "18–24", value: "age18_24" },
  { label: "25–34", value: "age25_34" },
  { label: "35–44", value: "age35_44" },
  { label: "45–55", value: "age45_55" },
  { label: "55+", value: "age55plus" },
];

export default function AgePage() {
  const router = useRouter();
  const [selection, setSelection] = useState<AgeBucket | null>(null);

  const handleContinue = () => {
    if (!selection) {
      return;
    }

    setAgeBucket(selection);
    router.push("/weight");
  };

  return (
    <OnboardingShell
      activeStep={2}
      showBack
      onBack={() => router.back()}
      primaryAction={
        <PrimaryButton disabled={!selection} onClick={handleContinue}>
          Continue
        </PrimaryButton>
      }
    >
      <h1 className="display-text age-title">How old are you?</h1>
      <p className="body-text subtitle-text age-subtitle">This helps personalize your plan.</p>

      <div className="sex-options">
        {AGE_OPTIONS.map((option) => (
          <OptionCard
            key={option.value}
            label={option.label}
            selected={selection === option.value}
            onClick={() => setSelection(option.value)}
          />
        ))}
      </div>
    </OnboardingShell>
  );
}
