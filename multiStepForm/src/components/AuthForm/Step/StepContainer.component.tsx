import Step from "./Step.component.tsx";
import "./step.styles.css";
import {StepItems} from "../../../constant.ts";

interface StepContainerProps {
    currentStep: number;
    complete: boolean;
}

function StepContainer({
                           currentStep,
                           complete,
                       }: StepContainerProps) {
    return (
        <div className="step-container">
            {StepItems.map((step, index) => (
                <Step
                    key={index}
                    {...step}
                    currentStep={currentStep}
                    disabled={complete}
                />
            ))}
        </div>
    );
}

export default StepContainer;
