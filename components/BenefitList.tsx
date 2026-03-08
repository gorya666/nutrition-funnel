import CheckIcon from "@/components/CheckIcon";

type BenefitListProps = {
  items: string[];
};

export default function BenefitList({ items }: BenefitListProps) {
  return (
    <ul className="paywall-benefit-list">
      {items.map((item) => (
        <li key={item} className="paywall-benefit-item">
          <span className="paywall-benefit-icon" aria-hidden="true">
            <CheckIcon size={14} strokeWidth={3} />
          </span>
          <span className="paywall-benefit-text">{item}</span>
        </li>
      ))}
    </ul>
  );
}
