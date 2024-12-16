import { useAppDispatch } from "../../../hooks/useAppDispatch.ts";
import {
  goToStep,
  selectCurrentStep,
} from "../../../features/Form/FormSlice.tsx";
import { useAppSelector } from "../../../hooks/useAppSelector.ts";

interface StepProps {
  step: number;
  description?: string;
  disabled: boolean;
}

function Step({ step, description, disabled }: StepProps) {
  const dispatch = useAppDispatch();
  const currentStep = useAppSelector(selectCurrentStep);
  return (
    <div
      className={`step ${disabled && "disabled"}`}
      onClick={() => dispatch(goToStep({ step: step - 1 }))}
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
