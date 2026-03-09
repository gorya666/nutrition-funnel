import CheckIcon from "@/components/CheckIcon";

type ProcessingStepCardProps = {
  label: string;
  state: "completed" | "current" | "upcoming";
};

export default function ProcessingStepCard({ label, state }: ProcessingStepCardProps) {
  const rowClassName =
    state === "completed"
      ? "processing-step-row processing-step-row-complete"
      : state === "current"
        ? "processing-step-row processing-step-row-active"
        : "processing-step-row";

  const textClassName =
    state === "completed"
      ? "processing-step-text processing-step-text-complete"
      : state === "current"
        ? "processing-step-text processing-step-text-active"
        : "processing-step-text";

  const statusClassName =
    state === "completed"
      ? "processing-status processing-status-complete"
      : state === "current"
        ? "processing-status processing-status-active"
        : "processing-status processing-status-upcoming";

  return (
    <div className={rowClassName}>
      <p className={textClassName}>{label}</p>
      <span className={statusClassName} aria-hidden="true">
        {state === "completed" ? <CheckIcon size={14} strokeWidth={3} className="processing-step-icon" /> : null}
      </span>
    </div>
  );
}
