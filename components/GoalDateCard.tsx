import CheckIcon from "@/components/CheckIcon";

type GoalDateCardProps = {
  dateLabel: string;
  subtitle: string;
};

export default function GoalDateCard({ dateLabel, subtitle }: GoalDateCardProps) {
  return (
    <div className="card goal-date-card">
      <div className="goal-date-icon" aria-hidden="true">
        <CheckIcon size={16} strokeWidth={2.7} />
      </div>
      <div className="goal-date-copy">
        <p className="body-text goal-date-title">Reach your goal by {dateLabel}</p>
        <p className="small-text subtitle-text">{subtitle}</p>
      </div>
    </div>
  );
}
