"use client";

import Link from "next/link";
import { useState } from "react";

import BackButton from "@/components/BackButton";
import Card from "@/components/Card";
import GoalDateCard from "@/components/GoalDateCard";
import OptionCard from "@/components/OptionCard";
import PaceCard from "@/components/PaceCard";
import PrimaryButton from "@/components/PrimaryButton";
import ProgressBars from "@/components/ProgressBars";
import SelectableInfoCard from "@/components/SelectableInfoCard";
import WeightInputCard from "@/components/WeightInputCard";

export default function ComponentsPage() {
  const [pacePreview, setPacePreview] = useState<"slow" | "optimal" | "fast">("optimal");
  const [desiredWeightPreview, setDesiredWeightPreview] = useState("72");

  return (
    <div className="components-playground-page">
      <div className="components-playground-shell">
        <Link href="/welcome" className="flow-back-link">
          Back to flow
        </Link>

        <section className="playground-section">
          <h1 className="title-text">Typography</h1>
          <Card className="playground-stack">
            <p className="display-text">
              <span className="title-highlight">Lose weight</span> with a personalized nutrition plan
            </p>
            <p className="small-text subtitle-text">Takes about 1 minute</p>
            <p className="title-3-text">Choose your age range</p>
            <p className="body-text">This is body copy in Inter for descriptions and helper content.</p>
          </Card>
        </section>

        <section className="playground-section">
          <h2 className="title-text">Buttons</h2>
          <Card className="playground-stack">
            <PrimaryButton>Continue</PrimaryButton>
            <PrimaryButton disabled>Continue</PrimaryButton>
            <BackButton />
          </Card>
        </section>

        <section className="playground-section">
          <h2 className="title-text">Cards</h2>
          <Card className="playground-stack">
            <p className="body-text">Default Card surface</p>
          </Card>
          <div className="playground-stack">
            <OptionCard label="Female" emoji="👩" selected={false} />
            <OptionCard label="Male" emoji="👨" selected />
            <OptionCard label="Prefer not to say" emoji="🙂" selected={false} />
          </div>
          <p className="small-text subtitle-text">Hover states are visible on pointer devices.</p>
        </section>

        <section className="playground-section">
          <h2 className="title-text">Reusable selector + badge</h2>
          <div className="playground-stack">
            <SelectableInfoCard
              emoji="⚖️"
              title="Optimal"
              meta="0.5 kg / week"
              subtitle="Balanced and sustainable"
              badgeText="Recommended"
              selected
            />
            <SelectableInfoCard
              emoji="🐢"
              title="Slow"
              meta="0.3 kg / week"
              subtitle="Easier to maintain"
              selected={false}
            />
          </div>
        </section>

        <section className="playground-section">
          <h2 className="title-text">Progress</h2>
          <Card className="playground-stack">
            <ProgressBars activeStep={0} />
            <ProgressBars activeStep={3} />
            <ProgressBars activeStep={7} />
          </Card>
        </section>

        <section className="playground-section">
          <h2 className="title-text">Pace</h2>
          <Card className="playground-stack">
            <p className="small-text subtitle-text">Weight loss per week</p>
            <p className="pace-metric-value">
              <span className="pace-metric-number">{pacePreview === "slow" ? "0.3" : pacePreview === "fast" ? "0.7" : "0.5"}</span>
              <span className="pace-metric-unit">kg per week</span>
            </p>
            <div className="pace-card-list">
              <PaceCard
                value="slow"
                title="Slow"
                paceLabel="0.3 kg / week"
                description="Easier to maintain"
                emoji="🐢"
                selected={pacePreview === "slow"}
                onSelect={setPacePreview}
              />
              <PaceCard
                value="optimal"
                title="Optimal"
                paceLabel="0.5 kg / week"
                description="Balanced and sustainable"
                emoji="⚖️"
                recommended
                selected={pacePreview === "optimal"}
                onSelect={setPacePreview}
              />
              <PaceCard
                value="fast"
                title="Fast"
                paceLabel="0.7 kg / week"
                description="More aggressive deficit"
                emoji="🔥"
                selected={pacePreview === "fast"}
                onSelect={setPacePreview}
              />
            </div>
          </Card>
          <GoalDateCard
            dateLabel="31 December 2026"
            subtitle="Requires a more structured calorie deficit and consistent activity."
          />
        </section>

        <section className="playground-section">
          <h2 className="title-text">Desired Weight Input</h2>
          <WeightInputCard
            label="Target weight"
            unit="kg"
            value={desiredWeightPreview}
            onChange={setDesiredWeightPreview}
          />
          <p className="small-text subtitle-text">For your height, a healthy range is 60–81 kg</p>
        </section>

        <section className="playground-section">
          <h2 className="title-text">Footer layout</h2>
          <Card className="footer-layout-preview">
            <div className="footer-layout-body">
              <p className="body-text">Scrollable content area preview</p>
            </div>
            <div className="footer-layout-actions">
              <PrimaryButton>Continue</PrimaryButton>
              <BackButton />
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
