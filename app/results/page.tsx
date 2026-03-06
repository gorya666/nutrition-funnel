"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

import Card from "@/components/Card";
import OnboardingShell from "@/components/OnboardingShell";
import PrimaryButton from "@/components/PrimaryButton";
import TimelineGraph from "@/components/TimelineGraph";
import {
  clearQuizState,
  getQuizState,
} from "@/store/quizStore";

function formatWeight(value: number) {
  return Number.isInteger(value) ? `${value}` : value.toFixed(1);
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export default function ResultsPage() {
  const router = useRouter();
  const [quiz] = useState(() => getQuizState());

  const handleStartOver = () => {
    clearQuizState();
    router.push("/age");
  };

  const handleContinue = () => {
    router.push("/age");
  };

  const currentWeight = quiz.currentWeightKg ?? 0;
  const desiredWeight = quiz.desiredWeightKg ?? 0;
  const paceKgPerWeek = quiz.paceKgPerWeek ?? 0.5;
  const totalGapKg = Math.max(currentWeight - desiredWeight, 1);
  const weeksToGoal = Math.max(1, Math.ceil(totalGapKg / paceKgPerWeek));

  const goalDateLabel = useMemo(() => {
    const next = new Date();
    next.setDate(next.getDate() + weeksToGoal * 7);
    return formatDate(next);
  }, [weeksToGoal]);

  const calories = useMemo(() => {
    const maintenanceEstimate = currentWeight * 30;
    const deficitPerDay = (paceKgPerWeek * 7700) / 7;
    return Math.round(clamp(maintenanceEstimate - deficitPerDay, 1200, 2600));
  }, [currentWeight, paceKgPerWeek]);

  const macros = useMemo(() => {
    const protein = Math.round(clamp(currentWeight * 1.8, 80, 220));
    const fats = Math.round(clamp(currentWeight * 0.8, 40, 120));
    const carbs = Math.round(clamp((calories - protein * 4 - fats * 9) / 4, 70, 360));

    return { protein, fats, carbs };
  }, [calories, currentWeight]);

  if (!quiz.currentWeightKg || !quiz.desiredWeightKg) {
    return (
      <OnboardingShell
        activeStep={6}
        showBack
        onBack={() => router.back()}
        primaryAction={<PrimaryButton onClick={handleStartOver}>Start from beginning</PrimaryButton>}
      >
        <h1 className="display-text age-title">Your plan is ready</h1>
        <p className="body-text subtitle-text age-subtitle">Add your desired weight to generate your full timeline.</p>
      </OnboardingShell>
    );
  }

  return (
    <OnboardingShell activeStep={6} showBack onBack={() => router.back()} primaryAction={<PrimaryButton onClick={handleContinue}>Continue</PrimaryButton>}>
      <h1 className="display-text age-title">Your custom plan is ready!</h1>
      <p className="body-text subtitle-text age-subtitle">Reach {formatWeight(desiredWeight)} kg by {goalDateLabel}</p>

      <Card className="target-progress-card">
        <TimelineGraph
          title="Projected progress"
          currentWeightKg={currentWeight}
          targetWeightKg={desiredWeight}
          weeksToGoal={weeksToGoal}
        />
      </Card>

      <Card className="results-macros-card">
        <p className="title-3-text results-macros-title">Daily recommendations</p>
        <p className="results-calories-value">
          {calories}
          <span className="results-calories-unit">kcal</span>
        </p>

        <div className="results-macros-grid">
          <div className="results-macro-item">
            <p className="small-text subtitle-text">Carbs</p>
            <p className="body-text results-macro-value">{macros.carbs} g</p>
          </div>
          <div className="results-macro-item">
            <p className="small-text subtitle-text">Fats</p>
            <p className="body-text results-macro-value">{macros.fats} g</p>
          </div>
          <div className="results-macro-item">
            <p className="small-text subtitle-text">Proteins</p>
            <p className="body-text results-macro-value">{macros.protein} g</p>
          </div>
        </div>
      </Card>
    </OnboardingShell>
  );
}
