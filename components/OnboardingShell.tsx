"use client";

import { ReactNode } from "react";

import BackButton from "@/components/BackButton";
import BottomActionBar from "@/components/BottomActionBar";
import ProgressBars from "@/components/ProgressBars";

type OnboardingShellProps = {
  activeStep: number;
  totalSteps?: number;
  showBack?: boolean;
  onBack?: () => void;
  hideProgress?: boolean;
  children: ReactNode;
  primaryAction?: ReactNode;
};

export default function OnboardingShell({
  activeStep,
  totalSteps,
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
  const hasHeader = showBack || !hideProgress;

  return (
    <div className="onboarding-shell">
      {hasHeader ? (
        <header className="onboarding-header">
          {!hideProgress ? (
            <div className="onboarding-header-progress-row">
              <div className="onboarding-header-progress">
                <ProgressBars activeStep={activeStep} totalSteps={totalSteps} />
              </div>
            </div>
          ) : null}

          {showBack ? (
            <div className="onboarding-header-back-row">
              <BackButton onClick={handleBack} className="onboarding-header-back" />
            </div>
          ) : null}
        </header>
      ) : null}

      <main className={contentClassName}>{children}</main>

      {hasFooterAction ? (
        <BottomActionBar>
          <div className="onboarding-footer-actions">{primaryAction}</div>
        </BottomActionBar>
      ) : null}
    </div>
  );
}
