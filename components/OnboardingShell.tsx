"use client";

import { ReactNode } from "react";

import BackButton from "@/components/BackButton";
import ProgressBars from "@/components/ProgressBars";

type OnboardingShellProps = {
  activeStep: number;
  showBack?: boolean;
  onBack?: () => void;
  hideProgress?: boolean;
  children: ReactNode;
  primaryAction?: ReactNode;
};

export default function OnboardingShell({
  activeStep,
  showBack = false,
  onBack,
  hideProgress = false,
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

  const hasFooterAction = Boolean(primaryAction);
  const contentClassName = hasFooterAction
    ? "onboarding-content onboarding-content-default"
    : "onboarding-content onboarding-content-no-footer";

  return (
    <div className="onboarding-shell">
      <header className="onboarding-header">
        <div className="onboarding-header-main">
          {showBack ? (
            <BackButton onClick={handleBack} className="onboarding-header-back" />
          ) : (
            <span className="onboarding-header-back-spacer" aria-hidden="true" />
          )}

          {!hideProgress ? (
            <div className="onboarding-header-progress">
              <ProgressBars activeStep={activeStep} />
            </div>
          ) : (
            <span className="onboarding-header-progress-spacer" aria-hidden="true" />
          )}
        </div>
      </header>

      <main className={contentClassName}>{children}</main>

      {hasFooterAction ? (
        <footer className="onboarding-footer">
          <div className="onboarding-footer-actions">{primaryAction}</div>
        </footer>
      ) : null}
    </div>
  );
}
