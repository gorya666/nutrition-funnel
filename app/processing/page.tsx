"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import CheckIcon from "@/components/CheckIcon";
import OnboardingShell from "@/components/OnboardingShell";

const STEPS = [
  "Analyzing your body metrics",
  "Calculating your calorie target",
  "Estimating your weight timeline",
  "Building your nutrition plan",
] as const;

const STEP_RANGES = [0.25, 0.5, 0.75, 1] as const;

export default function ProcessingPage() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const durationMs = 5200;
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
    }, 450);

    return () => window.clearTimeout(timeoutId);
  }, [done, router]);

  const currentStepIndex = useMemo(() => {
    if (progress <= STEP_RANGES[0]) {
      return 0;
    }

    if (progress <= STEP_RANGES[1]) {
      return 1;
    }

    if (progress <= STEP_RANGES[2]) {
      return 2;
    }

    return 3;
  }, [progress]);

  const percent = Math.round(progress * 100);

  return (
    <OnboardingShell activeStep={7} primaryAction={<div className="processing-footer-spacer" aria-hidden />}>
      <h1 className="display-text processing-title">
        We are crafting your <span className="title-highlight">nutrition experience…</span>
      </h1>

      <div className="processing-progress-head">
        <p className="processing-step-label">{STEPS[currentStepIndex]}</p>
        <p className="small-text subtitle-text processing-percent">{percent}%</p>
      </div>

      <div className="processing-track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent}>
        <span className="processing-fill" style={{ width: `${percent}%` }} />
      </div>

      <div className="processing-steps" aria-live="polite">
        {STEPS.map((step, index) => {
          const completed = progress >= STEP_RANGES[index];
          const active = !completed && index === currentStepIndex;

          return (
            <div key={step} className="processing-step-row">
              <p className={active ? "processing-step-text processing-step-text-active" : "processing-step-text"}>
                {step}
              </p>
              <span className={completed ? "processing-step-badge processing-step-badge-complete" : "processing-step-badge"} aria-hidden="true">
                {completed ? <CheckIcon size={16} strokeWidth={3} className="processing-step-icon" /> : null}
              </span>
            </div>
          );
        })}
      </div>
    </OnboardingShell>
  );
}
