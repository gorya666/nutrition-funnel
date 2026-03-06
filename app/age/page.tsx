"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import OnboardingShell from "@/components/OnboardingShell";
import OptionCard from "@/components/OptionCard";
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
  const [isAdvancing, setIsAdvancing] = useState(false);
  const navigationTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (navigationTimeoutRef.current !== null) {
        window.clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, []);

  const handleSelect = (value: AgeBucket) => {
    if (isAdvancing) {
      return;
    }

    setSelection(value);
    setAgeBucket(value);
    setIsAdvancing(true);

    navigationTimeoutRef.current = window.setTimeout(() => {
      router.push("/weight");
    }, 300);
  };

  return (
    <OnboardingShell
      activeStep={1}
      showBack
      onBack={() => router.back()}
    >
      <h1 className="display-text age-title">How old are you?</h1>
      <p className="body-text subtitle-text age-subtitle">This helps personalize your plan.</p>

      <div className="sex-options">
        {AGE_OPTIONS.map((option) => (
          <OptionCard
            key={option.value}
            label={option.label}
            selected={selection === option.value}
            onClick={() => handleSelect(option.value)}
          />
        ))}
      </div>
    </OnboardingShell>
  );
}
