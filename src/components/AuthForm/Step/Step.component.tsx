interface StepProps {
    step: number;
    description?: string;
    currentStep?: number;
    navigateTo: (value: number) => void;
    disabled: boolean;
}

function Step({
                  step,
                  description,
                  currentStep,
                  navigateTo,
                  disabled,
              }: StepProps) {
    return (
        <div
            className={`step ${disabled && "disabled"}`}
            onClick={() => navigateTo(step)}
        >
            <div
                className={`step__number ${currentStep === step - 1 ? "active" : ""}`}
            >
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
