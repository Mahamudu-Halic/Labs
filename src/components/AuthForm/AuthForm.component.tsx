import {useState} from "react";
import "./authform.styles.css";
import PersonalInfo from "./PersonalInfo/PersonalInfo.component";
import {UpdateFieldType} from "../../types";
import personalInfoValidation from "../../utils/personalInfo.validation";
import Plan from "./Plan/Plan.component";
import StepContainer from "./PersonalInfo/Step/StepContainer.component";

function AuthForm() {
    const [currentStep, setCurrentStep] = useState<number>(
        () => Number(localStorage.getItem("currentStep")) || 1
    );

    const [userName, setUserName] = useState<string>(
        () => localStorage.getItem("userName") || ""
    );
    
    const [userErrorMsg, setUserErrorMsg] = useState<string>("");

    const [email, setEmail] = useState<string>(
        () => localStorage.getItem("email") || ""
    );
    const [emailErrorMsg, setEmailErrorMsg] = useState<string>("");

    const [phoneNumber, setPhoneNumber] = useState<string>(
        () => localStorage.getItem("phoneNumber") || ""
    );
    const [phoneErrorMsg, setPhoneErrorMsg] = useState<string>("");

    const handlePreviousStep = () => {
        if (currentStep === 1) return;
        localStorage.setItem("currentStep", String(currentStep - 1));
        setCurrentStep((prevStep) => prevStep - 1);
    };

    const handleNextStep = () => {
        if (currentStep === 4) return;

        if (currentStep === 1) {
            const {isValid, userError, emailError, phoneError} =
                personalInfoValidation(userName, email, phoneNumber);

            setUserErrorMsg(userError);
            setEmailErrorMsg(emailError);
            setPhoneErrorMsg(phoneError);

            if (!isValid) return;
        }

        localStorage.setItem("currentStep", String(currentStep + 1));
        setCurrentStep((prevStep) => prevStep + 1);
    };

    const updateField: UpdateFieldType =
        (fieldName, setState) => (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            setState(value);
            localStorage.setItem(fieldName, value.trim());
        };

    return (
        <div className="auth__form">
            <StepContainer currentStep={currentStep}/>
            <div className="auth__form-container">
                {/*personal info*/}
                {currentStep === 1 && (
                    <PersonalInfo
                        userName={userName}
                        email={email}
                        phoneNumber={phoneNumber}
                        userErrorMsg={userErrorMsg}
                        emailErrorMsg={emailErrorMsg}
                        phoneErrorMsg={phoneErrorMsg}
                        updateUserName={updateField("userName", setUserName)}
                        updateEmail={updateField("email", setEmail)}
                        updatePhoneNumber={updateField("phoneNumber", setPhoneNumber)}
                    />
                )}

                {/*plan*/}
                {currentStep === 2 && <Plan/>}

                {/*add-ons*/}
                {currentStep === 3 && <div>Add-ons</div>}

                {/*summary*/}
                {currentStep === 4 && <div>Summary</div>}

                <div className="auth__form-button-container">
                    {currentStep !== 1 && (
                        <button onClick={handlePreviousStep} className="auth__form-prev-button">
                            go back
                        </button>
                    )}
                    <button
                        onClick={handleNextStep}
                        className={`auth__form-button ${
                            currentStep === 4 ? "confirm" : ""
                        }`}
                    >
                        {currentStep === 4 ? "Confirm" : "Next Step"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AuthForm;
