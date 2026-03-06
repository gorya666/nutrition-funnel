import Badge from "@/components/Badge";

type InsightBannerProps = {
  bmi: number;
};

type BmiStatus = {
  label: "Underweight" | "Healthy" | "Overweight";
  message: string;
  badgeVariant: "warning" | "success";
};

function getBmiStatus(bmi: number): BmiStatus {
  if (bmi < 18.5) {
    return {
      label: "Underweight",
      message:
        "You're slightly below the healthy range for your height. A nutrition plan can help you reach a stronger weight.",
      badgeVariant: "warning",
    };
  }

  if (bmi < 25) {
    return {
      label: "Healthy",
      message:
        "Your weight is within a healthy range for your height. Small improvements can help you feel lighter and more energetic.",
      badgeVariant: "success",
    };
  }

  return {
    label: "Overweight",
    message:
      "You're slightly above the healthy range for your height. Losing a few kilograms can improve energy and long-term health.",
    badgeVariant: "warning",
  };
}

export default function InsightBanner({ bmi }: InsightBannerProps) {
  const status = getBmiStatus(bmi);

  return (
    <div className="insight-banner">
      <div className="insight-banner-row">
        <p className="insight-bmi-main">{bmi.toFixed(1)}</p>
        <Badge variant={status.badgeVariant}>{status.label}</Badge>
      </div>
      <p className="small-text insight-bmi-label">Body Mass Index</p>
      <p className="small-text subtitle-text insight-bmi-copy">{status.message}</p>
    </div>
  );
}
