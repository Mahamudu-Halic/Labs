import Step from "./Step.component.tsx";
import "./step.styles.css";
import { StepItems } from "../../../constant.ts";
import { useAppSelector } from "../../../hooks/useAppSelector.ts";
import { selectIsComplete } from "../../../features/Form/FormSlice.tsx";

function StepContainer() {
  const complete = useAppSelector(selectIsComplete);
  return (
    <div className="step-container">
      {StepItems.map((step, index) => (
        <Step key={index} {...step} disabled={complete} />
      ))}
    </div>
  );
}

export default StepContainer;
