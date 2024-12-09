import Step from "./Step.component.tsx";
import "./step.styles.css";
import {StepItems} from "../../../constant.ts";

interface StepContainerProps {
    currentStep: number;
    navigateTo: (value: number) => void;
    complete: boolean;
}

function StepContainer({
                           currentStep,
                           navigateTo,
                           complete,
                       }: StepContainerProps) {
    return (
        <div className="step-container">
            {StepItems.map((step, index) => (
                <Step
                    key={index}
                    {...step}
                    currentStep={currentStep}
                    navigateTo={navigateTo}
                    disabled={complete}
                />
            ))}
        </div>
    );
}

export default StepContainer;
