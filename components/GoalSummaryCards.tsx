import Card from "@/components/Card";

type GoalSummaryCardsProps = {
  desiredWeightKg: number;
  goalDateLabel: string;
};

export default function GoalSummaryCards({
  desiredWeightKg,
  goalDateLabel,
}: GoalSummaryCardsProps) {
  return (
    <div className="goal-summary-grid">
      <Card className="goal-summary-card">
        <p className="goal-summary-label">Your goal weight</p>
        <p className="goal-summary-value">{desiredWeightKg} kg</p>
      </Card>

      <Card className="goal-summary-card">
        <p className="goal-summary-label">Reach your goal</p>
        <p className="goal-summary-value">by {goalDateLabel}</p>
      </Card>
    </div>
  );
}
