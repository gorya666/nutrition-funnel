"use client";

import { ReactNode } from "react";

import BackButton from "@/components/BackButton";
import ProgressBars from "@/components/ProgressBars";

type OnboardingShellProps = {
  activeStep: number;
  showBack?: boolean;
  onBack?: () => void;
  children: ReactNode;
  primaryAction: ReactNode;
};

export default function OnboardingShell({
  activeStep,
  showBack = false,
  onBack,
  children,
  primaryAction,
}: OnboardingShellProps) {
  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }

    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  const contentClassName = showBack
    ? "onboarding-content onboarding-content-with-secondary"
    : "onboarding-content onboarding-content-default";

  return (
    <div className="onboarding-shell">
      <header className="onboarding-header">
        <ProgressBars activeStep={activeStep} />
      </header>

      <main className={contentClassName}>{children}</main>

      <footer className="onboarding-footer">
        <div className="onboarding-footer-actions">
          {primaryAction}
          {showBack ? (
            <BackButton onClick={handleBack} />
          ) : null}
        </div>
      </footer>
    </div>
  );
}
