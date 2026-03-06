import { ButtonHTMLAttributes } from "react";

type BackButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function BackButton({
  className = "",
  type = "button",
  ...props
}: BackButtonProps) {
  const resolvedClassName = className ? `back-button ${className}` : "back-button";

  return (
    <button type={type} className={resolvedClassName} {...props}>
      Back
    </button>
  );
}
