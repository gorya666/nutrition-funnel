import { ReactNode } from "react";

import Badge from "@/components/Badge";
import CheckIcon from "@/components/CheckIcon";

type SelectionCardProps = {
  title: string;
  selected: boolean;
  onClick?: () => void;
  subtitle?: string;
  badgeText?: string;
  leadingIcon?: ReactNode;
  trailingControl?: boolean;
  disabled?: boolean;
  className?: string;
  role?: "radio" | "button";
  ariaChecked?: boolean;
};

export default function SelectionCard({
  title,
  selected,
  onClick,
  subtitle,
  badgeText,
  leadingIcon,
  trailingControl = true,
  disabled = false,
  className,
  role = "button",
  ariaChecked,
}: SelectionCardProps) {
  const classes = [
    "card",
    "selection-card",
    selected ? "selection-card-selected" : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      type="button"
      role={role}
      aria-checked={role === "radio" ? ariaChecked ?? selected : undefined}
      aria-pressed={role === "button" ? selected : undefined}
      disabled={disabled}
      className={classes}
      onClick={onClick}
    >
      <span className="selection-card-left">
        {leadingIcon ? (
          <span className="selection-card-leading" aria-hidden="true">
            {leadingIcon}
          </span>
        ) : null}

        <span className="selection-card-copy">
          {badgeText ? (
            <Badge variant="success" className="selection-card-badge selection-card-badge-top">
              {badgeText}
            </Badge>
          ) : null}
          <span className="selection-card-title">{title}</span>
          {subtitle ? (
            <span className="small-text subtitle-text selection-card-subtitle">{subtitle}</span>
          ) : null}
        </span>
      </span>

      {trailingControl ? (
        <span className="selection-card-right">
          <span className={selected ? "selection-card-indicator selection-card-indicator-selected" : "selection-card-indicator"} aria-hidden="true">
            <span className={selected ? "selection-card-check selection-card-check-visible" : "selection-card-check"}>
              <CheckIcon size={14} strokeWidth={3} />
            </span>
          </span>
        </span>
      ) : null}
    </button>
  );
}
