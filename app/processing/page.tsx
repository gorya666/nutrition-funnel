"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import OnboardingShell from "@/components/OnboardingShell";
import ProcessingStepCard from "@/components/ProcessingStepCard";

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
    <OnboardingShell activeStep={9} totalSteps={11} showBack onBack={() => router.back()}>
      <h1 className="title-text processing-title">Personalizing your plan</h1>

      <div className="processing-track" role="progressbar" aria-label="Personalizing plan progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
        <span className="processing-fill" style={{ width: `${percent}%` }} />
      </div>

      <div className="processing-steps" aria-live="polite">
        {STEPS.map((step, index) => {
          const completed = index < completedCount;
          const active = index === activeIndex;
          const state = completed ? "completed" : active ? "current" : "upcoming";

          return (
            <ProcessingStepCard
              key={step}
              label={step}
              state={state}
            />
          );
        })}
      </div>
    </OnboardingShell>
  );
}
