import CheckIcon from "@/components/CheckIcon";

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
  const className = selected ? "card option-card option-card-selected" : "card option-card";
  const checkClassName = selected ? "option-card-check option-card-check-visible" : "option-card-check";

  return (
    <button type="button" className={className} onClick={onClick} aria-pressed={selected}>
      <span className="option-card-main">
        {emoji ? (
          <span className="option-card-emoji" aria-hidden="true">
            {emoji}
          </span>
        ) : null}
        <span className="option-card-content">
          <span className="option-card-label">{label}</span>
          {description ? <span className="small-text subtitle-text">{description}</span> : null}
        </span>
      </span>
      <span className={selected ? "option-card-indicator option-card-indicator-selected" : "option-card-indicator"} aria-hidden="true">
        <span className={checkClassName}>
          <CheckIcon size={14} strokeWidth={3} />
        </span>
      </span>
    </button>
  );
}
