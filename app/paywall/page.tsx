"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState, useSyncExternalStore } from "react";

import BenefitList from "@/components/BenefitList";
import InsightChip from "@/components/InsightChip";
import OnboardingShell from "@/components/OnboardingShell";
import PricingPlanCard from "@/components/PricingPlanCard";
import PrimaryButton from "@/components/PrimaryButton";
import ReviewCard from "@/components/ReviewCard";
import {
  clearQuizState,
  getQuizServerSnapshot,
  getQuizSnapshot,
  subscribeQuizState,
} from "@/store/quizStore";

type PlanOption = {
  id: "month_1" | "month_3" | "month_12";
  title: string;
  fullPrice: string;
  billingLabel?: string;
  pricePerDay: string;
  badge?: string;
};

const PLAN_OPTIONS: PlanOption[] = [
  {
    id: "month_1",
    title: "1 month",
    fullPrice: "$14.98",
    pricePerDay: "$0.49",
  },
  {
    id: "month_3",
    title: "3 month",
    fullPrice: "$44.97 $20.70",
    billingLabel: "every 3 month",
    pricePerDay: "$0.23",
    badge: "Save 54%",
  },
  {
    id: "month_12",
    title: "12 month",
    fullPrice: "$179.76 $69.99",
    billingLabel: "per year",
    pricePerDay: "$0.19",
    badge: "Best value",
  },
];

const BENEFIT_ITEMS = [
  "Log meals in the way that suits you best",
  "Trigger alerts for what slows your progress",
  "Simple fixes for your next meal",
  "Recipe ideas based on your taste",
  "Weekly check-ins to keep you moving",
];

const INSIGHT_CHIPS: Array<{ label: string; emoji: string; tone: "mint" | "sand" | "peach" }> = [
  { label: "Food noise", emoji: "💥", tone: "mint" },
  { label: "Water intake", emoji: "💧", tone: "mint" },
  { label: "Favorite food", emoji: "🍔", tone: "sand" },
  { label: "Blood sugar patterns", emoji: "🎂", tone: "sand" },
  { label: "Activity level", emoji: "🏃", tone: "peach" },
];

const REVIEW_STORIES = [
  {
    body: "I finally understand what I’m eating. The photo tracking makes it so much easier to stay on top of calories without overthinking every meal.",
    name: "Olivia Bennett",
    date: "26 Feb 2026",
  },
  {
    body: "I always struggled with evening cravings. Now, I’m making much healthier choices for my late-night snacks with CalorieSnap. It helped me stay consistent and finally reach my goal shape. It’s not a diet; it’s just a better way to live.",
    name: "Nsia Yalwa",
    date: "31 Feb 2026",
  },
  {
    body: "When I started tracking correctly with CalorieSnap, the stress disappeared. I’ve lost 5kg and finally hit my goal shape without giving up the foods I love. It’s the first time tracking hasn’t felt like a chore.",
    name: "Caroline Gibbs",
    date: "15 Jan 2026",
  },
];

export default function PaywallPage() {
  const router = useRouter();
  const quiz = useSyncExternalStore(
    subscribeQuizState,
    getQuizSnapshot,
    getQuizServerSnapshot
  );
  const [selectedPlanId, setSelectedPlanId] = useState<PlanOption["id"]>("month_3");

  const goalWeight = Math.round(quiz.desiredWeightKg ?? 65);
  const goalDateLabel = useMemo(() => {
    if (quiz.goalDateISO) {
      const parsed = new Date(quiz.goalDateISO);
      if (!Number.isNaN(parsed.getTime())) {
        return new Intl.DateTimeFormat("en-US", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(parsed);
      }
    }

    const fallback = new Date();
    fallback.setDate(fallback.getDate() + 84);
    return new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(fallback);
  }, [quiz.goalDateISO]);

  const handleStartTrial = () => {
    clearQuizState();
    router.push("/");
  };

  return (
    <OnboardingShell
      activeStep={11}
      totalSteps={11}
      showBack
      onBack={() => router.back()}
      primaryAction={<PrimaryButton onClick={handleStartTrial}>Get my results</PrimaryButton>}
    >
      <section className="paywall-copy">
        <h1 className="display-text paywall-title">
          Reach your goal of {goalWeight} kg with your personal plan
        </h1>
        <p className="body-text subtitle-text paywall-subtitle">
          Estimated date: {goalDateLabel} with CalorieSnap premium
        </p>
      </section>

      <section className="paywall-plans" aria-label="Pricing options">
        {PLAN_OPTIONS.map((plan) => (
          <PricingPlanCard
            key={plan.id}
            title={plan.title}
            fullPrice={plan.fullPrice}
            billingLabel={plan.billingLabel}
            pricePerDay={plan.pricePerDay}
            badge={plan.badge}
            selected={selectedPlanId === plan.id}
            onClick={() => setSelectedPlanId(plan.id)}
          />
        ))}
      </section>

      <p className="paywall-footnote">Cancel anytime — no commitment</p>

      <section className="paywall-section paywall-benefits">
        <h2 className="title-text paywall-section-heading">What you’ll get</h2>
        <BenefitList items={BENEFIT_ITEMS} />
      </section>

      <section className="paywall-section paywall-insights">
        <h2 className="title-text paywall-section-heading">Your nutrition insights in your personal plan</h2>
        <p className="body-text subtitle-text paywall-insights-subtitle">Based on your quiz results</p>
        <div className="paywall-insights-chip-wrap">
          {INSIGHT_CHIPS.map((chip) => (
            <InsightChip
              key={chip.label}
              label={chip.label}
              emoji={chip.emoji}
              tone={chip.tone}
            />
          ))}
        </div>
      </section>

      <section className="paywall-track-section">
        <h2 className="title-text paywall-track-title">Track your calories with just a picture</h2>
        <div className="paywall-track-image-wrap">
          <Image
            src="/app image.png"
            alt="Track calories from a meal photo"
            fill
            sizes="(max-width: 500px) 100vw, 500px"
            className="paywall-track-image"
          />
        </div>
        <p className="body-text paywall-track-copy">
          Snap your meal and get an instant calorie estimate with macro insights.
        </p>
      </section>

      <section className="paywall-reviews-section" aria-label="Real user stories">
        <h2 className="title-text paywall-reviews-title">Real user stories</h2>
        <div className="paywall-reviews-list">
          {REVIEW_STORIES.map((story) => (
            <ReviewCard
              key={`${story.name}-${story.date}`}
              body={story.body}
              name={story.name}
              date={story.date}
            />
          ))}
        </div>
      </section>
    </OnboardingShell>
  );
}
