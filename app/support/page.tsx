"use client";

import { useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";

import OnboardingShell from "@/components/OnboardingShell";
import PrimaryButton from "@/components/PrimaryButton";
import {
  getQuizServerSnapshot,
  getQuizSnapshot,
  subscribeQuizState,
} from "@/store/quizStore";

const SUPPORT_CONTENT = {
  lose_weight: {
    message: "We’ll help you build a realistic plan to lose weight.",
  },
  maintain_weight: {
    message: "We’ll help you stay consistent and maintain your progress.",
  },
  gain_muscle: {
    message: "We’ll help you build strength with a plan you can actually follow.",
  },
} as const;

export default function SupportPage() {
  const router = useRouter();
  const { mainGoal } = useSyncExternalStore(
    subscribeQuizState,
    getQuizSnapshot,
    getQuizServerSnapshot
  );

  const content = mainGoal ? SUPPORT_CONTENT[mainGoal] : SUPPORT_CONTENT.lose_weight;

  return (
    <OnboardingShell
      activeStep={4}
      totalSteps={11}
      showBack
      onBack={() => router.push("/goal")}
      primaryAction={<PrimaryButton onClick={() => router.push("/activity")}>Continue</PrimaryButton>}
    >
      <div className="support-screen">
        <p className="support-emoji" aria-hidden="true">
          👌
        </p>
        <h1 className="display-text support-title">You&apos;re on the right path!</h1>
        <p className="body-text subtitle-text support-copy">{content.message}</p>
      </div>
    </OnboardingShell>
  );
}
