type ProgressBarsProps = {
  totalSteps?: number;
  activeStep: number;
};

export default function ProgressBars({ totalSteps = 10, activeStep }: ProgressBarsProps) {
  return (
    <div className="progress-bars" aria-label="Onboarding progress" role="progressbar" aria-valuemin={0} aria-valuemax={totalSteps} aria-valuenow={Math.min(activeStep + 1, totalSteps)}>
      {Array.from({ length: totalSteps }, (_, index) => {
        const isActive = index <= activeStep;

        return (
          <span
            key={index}
            className={isActive ? "progress-segment progress-segment-active" : "progress-segment progress-segment-inactive"}
          />
        );
      })}
    </div>
  );
}
