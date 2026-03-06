import { useId } from "react";

import Card from "@/components/Card";

type WeightInputCardProps = {
  label: string;
  unit: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  helperText?: string;
  invalid?: boolean;
};

export default function WeightInputCard({
  label,
  unit,
  value,
  onChange,
  placeholder = "0",
  helperText,
  invalid = false,
}: WeightInputCardProps) {
  const cardClassName = invalid ? "weight-input-card weight-input-card-invalid" : "weight-input-card";
  const inputId = useId();
  const helperId = `${inputId}-helper`;
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
      {helperText ? (
        <p
          id={helperId}
          className={invalid ? "small-text weight-input-helper-text weight-input-helper-error" : "small-text subtitle-text weight-input-helper-text"}
          aria-live="polite"
        >
          {helperText}
        </p>
      ) : null}
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
          aria-describedby={helperText ? helperId : undefined}
        />
      </div>
    </Card>
  );
}
