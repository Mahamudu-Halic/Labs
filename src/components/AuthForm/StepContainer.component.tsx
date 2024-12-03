import { useState } from "react";
import Step from "./Step.component";

const StepArr = [
  { step: 1, description: "Your Info" },
  { step: 2, description: "Select Plan" },
  { step: 3, description: "Add-ons" },
  { step: 4, description: "Summary" },
];

function StepContainer({currentStep}:{currentStep: number}) {
  return (
    <div className="step-container">
      {StepArr.map((step, index) => (
        <Step key={index} step={step.step} description={step.description} currentStep={currentStep}/>
      ))}
    </div>
  );
}

export default StepContainer;
