import SelectableInfoCard from "@/components/SelectableInfoCard";
import type { PaceKey } from "@/store/quizStore";

type PaceCardProps = {
  value: PaceKey;
  title: string;
  paceLabel: string;
  description: string;
  emoji: string;
  selected: boolean;
  recommended?: boolean;
  onSelect: (value: PaceKey) => void;
};

export default function PaceCard({
  value,
  title,
  paceLabel,
  description,
  emoji,
  selected,
  recommended = false,
  onSelect,
}: PaceCardProps) {
  return (
    <SelectableInfoCard
      emoji={emoji}
      title={title}
      meta={paceLabel}
      subtitle={description}
      badgeText={recommended ? "Recommended" : undefined}
      selected={selected}
      role="radio"
      ariaChecked={selected}
      onClick={() => onSelect(value)}
    />
  );
}
