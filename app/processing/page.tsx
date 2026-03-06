"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import CheckIcon from "@/components/CheckIcon";
import OnboardingShell from "@/components/OnboardingShell";

const STEPS = [
  "Processing your responses",
  "Analyzing goals",
  "Defining nutrition requirement",
  "Estimating weight progress",
] as const;

export default function ProcessingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const durationMs = 4800;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const nextProgress = Math.min(elapsed / durationMs, 1);
      setProgress(nextProgress);

      if (nextProgress < 1) {
        frame = window.requestAnimationFrame(tick);
        return;
      }

      setDone(true);
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!done) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      router.push("/results");
    }, 250);

    return () => window.clearTimeout(timeoutId);
  }, [done, router]);

  const percent = Math.round(progress * 100);
  const stepCount = STEPS.length;
  const completedCount = done ? stepCount : Math.floor(progress * stepCount);
  const activeIndex = done ? -1 : Math.min(completedCount, stepCount - 1);

  return (
    <OnboardingShell activeStep={5} showBack onBack={() => router.back()}>
      <h1 className="title-text processing-title">Personalizing your plan</h1>

      <div className="processing-track" role="progressbar" aria-label="Personalizing plan progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
        <span className="processing-fill" style={{ width: `${percent}%` }} />
      </div>

      <div className="processing-cards" aria-live="polite">
        {STEPS.map((step, index) => {
          const completed = index < completedCount;
          const active = index === activeIndex;
          const cardClassName = completed
            ? "processing-step-card processing-step-card-complete"
            : active
              ? "processing-step-card processing-step-card-active"
              : "processing-step-card";
          const textClassName = completed
            ? "processing-step-card-text processing-step-card-text-complete"
            : active
              ? "processing-step-card-text processing-step-card-text-active"
              : "processing-step-card-text";
          const statusClassName = completed
            ? "processing-status processing-status-complete"
            : active
              ? "processing-status processing-status-active"
              : "processing-status processing-status-upcoming";

          return (
            <div key={step} className={cardClassName}>
              <p className={textClassName}>{step}</p>
              <span className={statusClassName} aria-hidden="true">
                <span className={active ? "processing-status-pulse processing-status-pulse-visible" : "processing-status-pulse"} />
                <span className={completed ? "processing-status-check processing-status-check-visible" : "processing-status-check"}>
                  <CheckIcon size={16} strokeWidth={3} className="processing-step-icon" />
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </OnboardingShell>
  );
}
