import Image from "next/image";

type TimelineGraphProps = {
  currentWeightKg: number;
  targetWeightKg: number;
  weeksToGoal: number;
  title?: string;
  mode?: "milestone" | "resultsHero" | "results";
  startDate?: Date;
  goalDate?: Date;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export default function TimelineGraph({
  currentWeightKg,
  targetWeightKg,
  weeksToGoal,
  title,
  mode = "milestone",
  startDate = new Date(),
  goalDate,
}: TimelineGraphProps) {
  const startWeight = Math.round(currentWeightKg);
  const endWeight = Math.round(targetWeightKg);
  const weeks = Math.max(1, Math.round(weeksToGoal));

  const startX = 28;
  const endX = 285;
  const startY = 42;
  const axisY = 140;

  const weightDelta = Math.max(1, currentWeightKg - targetWeightKg);
  const normalizedDelta = clamp((weightDelta - 1) / 14, 0, 1);
  const endY = clamp(95 + normalizedDelta * 40, 95, 135);

  const c1x = startX + (endX - startX) * 0.34;
  const c1y = startY + 2;
  const c2x = startX + (endX - startX) * 0.72;
  const c2y = endY + 8;

  const curvePath = `M ${startX} ${startY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}`;
  const fillPath = `${curvePath} L ${endX} ${axisY} L ${startX} ${axisY} Z`;

  const startChipTop = startY - 42 - 8;
  const endChipTop = endY - 42 - 8;

  if (mode === "resultsHero" || mode === "results") {
    const goalMonthDate = goalDate ?? (() => {
      const next = new Date(startDate);
      next.setDate(next.getDate() + weeks * 7);
      return next;
    })();

    const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "short" });
    const monthDiff =
      (goalMonthDate.getFullYear() - startDate.getFullYear()) * 12 +
      (goalMonthDate.getMonth() - startDate.getMonth());

    const monthAtOffset = (base: Date, offset: number) => {
      const copy = new Date(base);
      copy.setMonth(copy.getMonth() + offset);
      return copy;
    };

    const startLabelDate = startDate;
    const endOffset = monthDiff <= 0 ? 2 : monthDiff;
    const endLabelDate = monthAtOffset(startDate, endOffset);
    let middleOffset = monthDiff <= 0 ? 1 : Math.max(1, Math.round(monthDiff / 2));

    if (middleOffset >= endOffset) {
      middleOffset = Math.max(1, endOffset - 1);
    }

    const middleLabelDate = monthAtOffset(startDate, middleOffset);

    const monthLabels = [
      monthFormatter.format(startLabelDate),
      monthFormatter.format(middleLabelDate),
      monthFormatter.format(endLabelDate),
    ];

    return (
      <div className="target-progress-hero target-progress-hero-results" aria-hidden>
        <Image
          src="/graph.svg"
          alt=""
          width={391}
          height={169}
          className="target-progress-hero-image"
          priority
        />

        <div className="target-progress-labels target-progress-labels-results-hero">
          <span className="small-text target-progress-label-results-item-hero">{monthLabels[0]}</span>
          <span className="small-text target-progress-label-results-item-hero">{monthLabels[1]}</span>
          <span className="small-text target-progress-label-results-item-hero">{monthLabels[2]}</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {title ? <p className="title-text target-progress-title">{title}</p> : null}
      <div className="target-progress-graphic" aria-hidden>
        <span className="target-weight-chip target-weight-chip-start" style={{ top: `${startChipTop}px` }}>
          {startWeight} kg
        </span>
        <span className="target-weight-chip target-weight-chip-end" style={{ top: `${endChipTop}px` }}>
          {endWeight} kg
        </span>

        <svg className="target-progress-svg" viewBox="0 0 320 170" preserveAspectRatio="xMidYMid meet">
          <line x1={startX} y1="32" x2={startX} y2={axisY} className="target-progress-axis" />
          <line x1={startX} y1={axisY} x2={endX} y2={axisY} className="target-progress-axis" />
          <path d={fillPath} className="target-progress-area" />
          <path d={curvePath} className="target-progress-curve" />
          <circle cx={startX} cy={startY} r="7" className="target-progress-point-start" />
          <circle cx={endX} cy={endY} r="7" className="target-progress-point-end" />
        </svg>

        <div className="target-progress-labels">
          <span className="small-text subtitle-text">Today</span>
          <span className="small-text subtitle-text">~{weeks} weeks</span>
        </div>
      </div>
    </>
  );
}
