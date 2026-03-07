"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

import OnboardingShell from "@/components/OnboardingShell";
import SelectionCard from "@/components/SelectionCard";
import {
  getQuizServerSnapshot,
  getQuizSnapshot,
  setAgeBucket,
  subscribeQuizState,
  type AgeBucket,
} from "@/store/quizStore";

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
  const { ageBucket } = useSyncExternalStore(
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

  const handleSelect = (value: AgeBucket) => {
    if (isAdvancing) {
      return;
    }

    setAgeBucket(value);
    setIsAdvancing(true);

    navigationTimeoutRef.current = window.setTimeout(() => {
      router.push("/weight");
    }, 300);
  };

  return (
    <OnboardingShell
      activeStep={0}
      showBack
      onBack={() => router.back()}
    >
      <h1 className="display-text age-title">How old are you?</h1>
      <p className="body-text subtitle-text age-subtitle">This helps personalize your plan.</p>

      <div className="sex-options">
        {AGE_OPTIONS.map((option) => (
          <SelectionCard
            key={option.value}
            title={option.label}
            selected={ageBucket === option.value}
            onClick={() => handleSelect(option.value)}
          />
        ))}
      </div>
    </OnboardingShell>
  );
}
