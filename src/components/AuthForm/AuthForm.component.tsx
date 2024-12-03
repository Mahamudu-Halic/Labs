import { useState } from "react";
import "./authform.styles.css";
import Form from "./Form.component";
import Step from "./Step.component";
import StepContainer from "./StepContainer.component";
function AuthForm() {
  const [currentStep, setCurrentStep] = useState<number>(1);

  

  return (
    <div className="auth__form">
      <StepContainer currentStep={currentStep}/>
      <div className="auth__form-container">
        <Form />
      </div>
    </div>
  );
}

export default AuthForm;
