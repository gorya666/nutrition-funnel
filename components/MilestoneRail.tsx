type MilestoneRailProps = {
  startWeightKg: number;
  targetWeightKg: number;
  weeks: number;
  compact?: boolean;
};

function formatWeight(value: number) {
  return Number.isInteger(value) ? `${value}` : value.toFixed(1);
}

export default function MilestoneRail({
  startWeightKg,
  targetWeightKg,
  weeks,
  compact = false,
}: MilestoneRailProps) {
  const graphicClassName = compact
    ? "target-progress-graphic target-progress-graphic-compact"
    : "target-progress-graphic";
  const svgClassName = compact
    ? "target-progress-svg target-progress-svg-compact"
    : "target-progress-svg";
  const startChipClassName = compact
    ? "target-weight-chip target-weight-chip-start target-weight-chip-start-compact"
    : "target-weight-chip target-weight-chip-start";
  const endChipClassName = compact
    ? "target-weight-chip target-weight-chip-end target-weight-chip-end-compact"
    : "target-weight-chip target-weight-chip-end";
  const labelsClassName = compact
    ? "target-progress-labels target-progress-labels-compact"
    : "target-progress-labels";

  return (
    <div className={graphicClassName} aria-hidden>
      <span className={startChipClassName}>{formatWeight(startWeightKg)} kg</span>
      <span className={endChipClassName}>{formatWeight(targetWeightKg)} kg</span>

      <svg className={svgClassName} viewBox="0 0 320 170" preserveAspectRatio="xMidYMid meet">
        <line x1="20" y1="32" x2="20" y2="140" className="target-progress-axis" />
        <line x1="20" y1="140" x2="300" y2="140" className="target-progress-axis" />
        <path
          d="M 20 42 C 120 42, 220 140, 300 140 L 300 140 L 20 140 Z"
          className="target-progress-area"
        />
        <path d="M 20 42 C 120 42, 220 140, 300 140" className="target-progress-curve" />
        <circle cx="20" cy="42" r="7" className="target-progress-point-start" />
        <circle cx="300" cy="140" r="7" className="target-progress-point-end" />
      </svg>

      <div className={labelsClassName}>
        <span className="small-text subtitle-text">Today</span>
        <span className="small-text subtitle-text">~{weeks} weeks</span>
      </div>
    </div>
  );
}
