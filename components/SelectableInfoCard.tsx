import Badge from "@/components/Badge";
import CheckIcon from "@/components/CheckIcon";

type SelectableInfoCardProps = {
  emoji: string;
  title: string;
  meta: string;
  subtitle: string;
  selected: boolean;
  badgeText?: string;
  metaStrong?: boolean;
  onClick?: () => void;
  role?: "radio" | "button";
  ariaChecked?: boolean;
};

export default function SelectableInfoCard({
  emoji,
  title,
  meta,
  subtitle,
  selected,
  badgeText,
  metaStrong = false,
  onClick,
  role = "button",
  ariaChecked,
}: SelectableInfoCardProps) {
  const className = selected
    ? "card selectable-info-card selectable-info-card-selected"
    : "card selectable-info-card";

  return (
    <button
      type="button"
      role={role}
      aria-checked={role === "radio" ? ariaChecked ?? selected : undefined}
      aria-pressed={role === "button" ? selected : undefined}
      className={className}
      onClick={onClick}
    >
      <div className="selectable-info-card-body">
        <div className="selectable-info-card-main">
          <span className="selectable-info-card-emoji" aria-hidden="true">
            {emoji}
          </span>

          <div className="selectable-info-card-copy">
            {badgeText ? (
              <Badge variant="success" className="selectable-info-card-badge selectable-info-card-badge-top">
                {badgeText}
              </Badge>
            ) : null}
            <p
              className={
                metaStrong
                  ? "selectable-info-card-title-line selectable-info-card-title-line-strong"
                  : "selectable-info-card-title-line"
              }
            >
              <span className="selectable-info-card-title">{title}</span>
              <span className="selectable-info-card-dot" aria-hidden="true">
                ·
              </span>
              <span className="selectable-info-card-meta">{meta}</span>
            </p>
            <p className="small-text subtitle-text selectable-info-card-subtitle">{subtitle}</p>
          </div>
        </div>

        <div className="selectable-info-card-side">
          {badgeText && !selected ? (
            <Badge variant="success" className="selectable-info-card-badge selectable-info-card-badge-side">
              {badgeText}
            </Badge>
          ) : null}
          <span
            className={selected ? "selectable-info-card-check selectable-info-card-check-visible" : "selectable-info-card-check"}
            aria-hidden="true"
          >
            <CheckIcon size={14} strokeWidth={3} />
          </span>
        </div>
      </div>
    </button>
  );
}
