import { useId } from "react";

import Card from "@/components/Card";

type WeightInputCardProps = {
  label: string;
  unit: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  invalid?: boolean;
};

export default function WeightInputCard({
  label,
  unit,
  value,
  onChange,
  placeholder = "0",
  invalid = false,
}: WeightInputCardProps) {
  const cardClassName = invalid ? "weight-input-card weight-input-card-invalid" : "weight-input-card";
  const inputId = useId();
  const inputName = label.toLowerCase().replace(/\s+/g, "_");

  const handleChange = (nextValue: string) => {
    const digitsOnly = nextValue.replace(/\D/g, "");
    onChange(digitsOnly);
  };

  return (
    <Card className={cardClassName}>
      <label className="small-text subtitle-text weight-input-label" htmlFor={inputId}>
        {label} <span className="weight-input-label-dot">·</span> {unit}
      </label>
      <div className="weight-input-row valueRow">
        <input
          id={inputId}
          className="weight-input-field weight-input-value"
          type="text"
          name={inputName}
          autoComplete="off"
          inputMode="numeric"
          pattern="[0-9]*"
          value={value}
          placeholder={placeholder}
          onChange={(event) => handleChange(event.target.value)}
          aria-invalid={invalid}
        />
      </div>
    </Card>
  );
}
