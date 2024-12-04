function Step({
  step,
  description,
  currentStep,
}: {
  step: number;
  description?: string;
  currentStep?: number;
}) {
  return (
    <div className="step">
      <div className={`step__number ${currentStep === step ? "active" : ""}`}>
        <p>{step}</p>
      </div>
      {description && (
        <div className="step__container">
          <p>STEP {step}</p>
          <h3 className="step__description">{description}</h3>
        </div>
      )}
    </div>
  );
}

export default Step;
