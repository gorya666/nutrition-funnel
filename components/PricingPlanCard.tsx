import Badge from "@/components/Badge";
import SelectionCard from "@/components/SelectionCard";

type PricingPlanCardProps = {
  title: string;
  pricePerDay: string;
  fullPrice: string;
  billingLabel?: string;
  badge?: string;
  selected?: boolean;
  onClick?: () => void;
};

export default function PricingPlanCard({
  title,
  pricePerDay,
  fullPrice,
  billingLabel,
  badge,
  selected = false,
  onClick,
}: PricingPlanCardProps) {
  const hasDiscountPair = fullPrice.includes(" ");
  const oldPrice = hasDiscountPair ? fullPrice.split(" ")[0] : null;
  const discountedPrice = hasDiscountPair ? fullPrice.slice(oldPrice?.length ?? 0).trim() : fullPrice;
  const currentWithBilling = billingLabel ? `${discountedPrice} ${billingLabel}` : discountedPrice;
  const fullWithBilling = billingLabel ? `${fullPrice} ${billingLabel}` : fullPrice;

  return (
    <SelectionCard
      selected={selected}
      onClick={onClick}
      variant="no-trailing-control"
      className="selection-card-pricing"
      title={<span className="paywall-pricing-title">{title}</span>}
      subtitle={(
        <span className="paywall-pricing-details">
          {badge ? (
            <Badge variant="warning" className="paywall-pricing-badge">
              {badge}
            </Badge>
          ) : null}
          <span className="paywall-pricing-full-line">
            {oldPrice ? (
              <>
                <span className="paywall-pricing-old">{oldPrice}</span>
                <span className="paywall-pricing-separator"> · </span>
                <span className="paywall-pricing-current">{currentWithBilling}</span>
              </>
            ) : (
              <span className="paywall-pricing-current">{fullWithBilling}</span>
            )}
          </span>
        </span>
      )}
      rightContent={(
        <span className="paywall-pricing-card-right">
          <span className="paywall-pricing-per-day">{pricePerDay}</span>
          <span className="paywall-pricing-per-day-label">per day</span>
        </span>
      )}
    />
  );
}
