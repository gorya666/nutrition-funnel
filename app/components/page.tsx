"use client";

import Link from "next/link";
import { useState } from "react";

import BackButton from "@/components/BackButton";
import Card from "@/components/Card";
import GoalDateCard from "@/components/GoalDateCard";
import PrimaryButton from "@/components/PrimaryButton";
import ProgressBars from "@/components/ProgressBars";
import SelectionCard from "@/components/SelectionCard";
import TimelineGraph from "@/components/TimelineGraph";
import WeightInputCard from "@/components/WeightInputCard";

const TYPOGRAPHY_SCALE = [
  {
    category: "Display",
    preview: "Display",
    previewClassName: "display-text",
    typeface: "Source Serif 4",
    weight: "600",
    size: "34px",
    caseStyle: "Sentence",
    letterSpacing: "0.02em",
  },
  {
    category: "Title",
    preview: "Title",
    previewClassName: "title-text",
    typeface: "Source Serif 4",
    weight: "600",
    size: "24px",
    caseStyle: "Sentence",
    letterSpacing: "0.02em",
  },
  {
    category: "Title 3",
    preview: "Title 3",
    previewClassName: "title-3-text",
    typeface: "Inter",
    weight: "700",
    size: "20px",
    caseStyle: "Sentence",
    letterSpacing: "0",
  },
  {
    category: "Secondary Title",
    preview: "Secondary",
    previewClassName: "secondary-title-text",
    typeface: "Source Serif 4",
    weight: "600",
    size: "18px",
    caseStyle: "Sentence",
    letterSpacing: "0",
  },
  {
    category: "Body",
    preview: "Body text",
    previewClassName: "body-text",
    typeface: "Inter",
    weight: "400",
    size: "16px",
    caseStyle: "Sentence",
    letterSpacing: "0",
  },
  {
    category: "Small",
    preview: "Small text",
    previewClassName: "small-text",
    typeface: "Inter",
    weight: "400",
    size: "14px",
    caseStyle: "Sentence",
    letterSpacing: "0",
  },
  {
    category: "Button",
    preview: "Continue",
    previewClassName: "typography-scale-button-preview",
    typeface: "Source Serif 4",
    weight: "600",
    size: "18px",
    caseStyle: "Sentence",
    letterSpacing: "0",
  },
] as const;

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
          <Card className="typography-scale-card">
            <div className="typography-scale-grid typography-scale-grid-header small-text subtitle-text">
              <span>Scale Category</span>
              <span>Typeface</span>
              <span>Weight</span>
              <span>Size</span>
              <span>Case</span>
              <span>Letter spacing</span>
            </div>

            {TYPOGRAPHY_SCALE.map((row) => (
              <div key={row.category} className="typography-scale-grid typography-scale-grid-row">
                <span className={row.previewClassName}>{row.preview}</span>
                <span className="small-text">{row.typeface}</span>
                <span className="small-text">{row.weight}</span>
                <span className="small-text">{row.size}</span>
                <span className="small-text">{row.caseStyle}</span>
                <span className="small-text">{row.letterSpacing}</span>
              </div>
            ))}
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
          <h2 className="title-text">Selection cards</h2>
          <Card className="playground-stack">
            <p className="body-text">Default Card surface</p>
          </Card>
          <div className="playground-stack">
            <SelectionCard title="Female" leadingIcon="👩" selected={false} />
            <SelectionCard title="Male" leadingIcon="👨" selected />
            <SelectionCard title="Prefer not to say" leadingIcon="🙂" selected={false} />
            <SelectionCard
              title="Slow · 0.3 kg per week"
              subtitle="Easier to maintain"
              leadingIcon="🐢"
              selected={false}
            />
            <SelectionCard
              title="Optimal · 0.5 kg per week"
              subtitle="Balanced and sustainable"
              leadingIcon="⚖️"
              badgeText="Recommended"
              selected
            />
          </div>
          <p className="small-text subtitle-text">Hover states are visible on pointer devices.</p>
        </section>

        <section className="playground-section">
          <h2 className="title-text">Main goal step</h2>
          <div className="playground-stack">
            <SelectionCard title="Lose weight" selected />
            <SelectionCard title="Maintain weight" selected={false} />
            <SelectionCard title="Gain muscle" selected={false} />
          </div>
        </section>

        <section className="playground-section">
          <h2 className="title-text">Activity level step</h2>
          <div className="playground-stack">
            <SelectionCard title="Not very active" leadingIcon="🛋️" selected={false} />
            <SelectionCard title="Lightly active" leadingIcon="🚶" selected />
            <SelectionCard title="Moderately active" leadingIcon="🏃" selected={false} />
            <SelectionCard title="Very active" leadingIcon="🔥" selected={false} />
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
          <h2 className="title-text">Timeline graph</h2>
          <Card>
            <TimelineGraph
              title="Projected progress"
              currentWeightKg={83}
              targetWeightKg={78}
              weeksToGoal={7}
            />
          </Card>
        </section>

        <section className="playground-section">
          <h2 className="title-text">Plan reveal</h2>
          <Card className="playground-stack">
            <p className="title-3-text results-macros-title">Daily recommendations</p>
            <p className="results-calories-value">
              1820
              <span className="results-calories-unit">kcal</span>
            </p>
            <div className="results-macros-grid">
              <div className="results-macro-item">
                <p className="small-text subtitle-text">Carbs</p>
                <p className="body-text results-macro-value">180 g</p>
              </div>
              <div className="results-macro-item">
                <p className="small-text subtitle-text">Fats</p>
                <p className="body-text results-macro-value">62 g</p>
              </div>
              <div className="results-macro-item">
                <p className="small-text subtitle-text">Proteins</p>
                <p className="body-text results-macro-value">126 g</p>
              </div>
            </div>
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
              <SelectionCard
                title="Slow · 0.3 kg per week"
                subtitle="Easier to maintain"
                leadingIcon="🐢"
                selected={pacePreview === "slow"}
                onClick={() => setPacePreview("slow")}
              />
              <SelectionCard
                title="Optimal · 0.5 kg per week"
                subtitle="Balanced and sustainable"
                leadingIcon="⚖️"
                badgeText="Recommended"
                selected={pacePreview === "optimal"}
                onClick={() => setPacePreview("optimal")}
              />
              <SelectionCard
                title="Fast · 0.7 kg per week"
                subtitle="More aggressive deficit"
                leadingIcon="🔥"
                selected={pacePreview === "fast"}
                onClick={() => setPacePreview("fast")}
              />
            </div>
          </Card>
          <GoalDateCard
            dateLabel="31 December 2026"
            subtitle="Requires a more structured calorie deficit and consistent activity."
          />
        </section>

        <section className="playground-section">
          <h2 className="title-text">Input variations</h2>
          <div className="playground-stack">
            <div>
              <WeightInputCard
                label="Desired weight"
                unit="kg"
                value=""
                onChange={() => {}}
              />
              <p className="small-text subtitle-text input-support-text">Default (empty)</p>
            </div>

            <div>
              <WeightInputCard
                label="Desired weight"
                unit="kg"
                value={desiredWeightPreview}
                onChange={setDesiredWeightPreview}
              />
              <p className="small-text subtitle-text input-support-text">Recommended weight: 73 kg</p>
            </div>

            <div>
              <WeightInputCard
                label="Desired weight"
                unit="kg"
                value="800"
                onChange={() => {}}
                invalid
              />
              <p className="small-text weight-shared-error input-support-text">
                Entered weight should be lower than your current weight.
              </p>
            </div>
          </div>
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
