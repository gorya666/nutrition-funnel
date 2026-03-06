import { ButtonHTMLAttributes } from "react";

type BackButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function BackButton({
  className = "",
  type = "button",
  ...props
}: BackButtonProps) {
  const resolvedClassName = className ? `back-button back-button-icon ${className}` : "back-button back-button-icon";

  return (
    <button type={type} className={resolvedClassName} aria-label="Go back" {...props}>
      <svg
        viewBox="0 0 24 24"
        width={20}
        height={20}
        aria-hidden="true"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15 18L9 12L15 6"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
