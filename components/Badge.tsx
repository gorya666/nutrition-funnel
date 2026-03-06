import type { ReactNode } from "react";

type BadgeVariant = "default" | "success" | "neutral" | "warning";

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
};

export default function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const classes = ["badge", `badge--${variant}`, className].filter(Boolean).join(" ");

  return <span className={classes}>{children}</span>;
}
