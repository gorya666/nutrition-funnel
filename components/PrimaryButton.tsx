import { ButtonHTMLAttributes } from "react";

type PrimaryButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function PrimaryButton({
  children,
  className = "",
  type = "button",
  ...props
}: PrimaryButtonProps) {
  const resolvedClassName = className ? `primary-button ${className}` : "primary-button";

  return (
    <button type={type} className={resolvedClassName} {...props}>
      {children}
    </button>
  );
}
