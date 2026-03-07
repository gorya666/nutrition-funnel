"use client";

import { useRouter } from "next/navigation";

import OnboardingShell from "@/components/OnboardingShell";
import PrimaryButton from "@/components/PrimaryButton";
import { clearQuizState } from "@/store/quizStore";

export default function PaywallPage() {
  const router = useRouter();
  const handleStartTrial = () => {
    clearQuizState();
    router.push("/welcome");
  };

  return (
    <OnboardingShell activeStep={6} showBack onBack={() => router.back()} primaryAction={<PrimaryButton onClick={handleStartTrial}>Start trial</PrimaryButton>}>
      <h1 className="display-text age-title">Unlock your full plan</h1>
      <p className="body-text subtitle-text age-subtitle">Paywall placeholder step. We can wire plans and pricing next.</p>
    </OnboardingShell>
  );
}
