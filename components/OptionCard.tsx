import SelectionCard from "@/components/SelectionCard";

type OptionCardProps = {
  label: string;
  emoji?: string;
  description?: string;
  selected: boolean;
  onClick?: () => void;
};

export default function OptionCard({
  label,
  emoji,
  description,
  selected,
  onClick,
}: OptionCardProps) {
  return (
    <SelectionCard
      title={label}
      subtitle={description}
      leadingIcon={emoji}
      selected={selected}
      onClick={onClick}
    />
  );
}
