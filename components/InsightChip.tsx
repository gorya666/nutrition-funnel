type InsightChipProps = {
  label: string;
  emoji: string;
  tone?: "mint" | "sand" | "peach";
};

export default function InsightChip({ label, emoji, tone = "mint" }: InsightChipProps) {
  const toneClass = `paywall-insight-chip-emoji-${tone}`;

  return (
    <span className="paywall-insight-chip">
      <span className={`paywall-insight-chip-emoji ${toneClass}`} aria-hidden="true">
        {emoji}
      </span>
      <span className="paywall-insight-chip-label">{label}</span>
    </span>
  );
}
