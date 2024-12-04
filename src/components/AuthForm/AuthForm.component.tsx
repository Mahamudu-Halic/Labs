import {useEffect, useState} from "react";
import "./authform.styles.css";
import PersonalInfo from "./PersonalInfo/PersonalInfo.component";
import {ServiceType, UpdateFieldType} from "../../types";
import personalInfoValidation from "../../utils/personalInfo.validation";
import Plan from "./Plan/Plan.component";
import StepContainer from "./PersonalInfo/Step/StepContainer.component";
import AddOns from "./Add-ons/AddOns.component.tsx";

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

    const [addons, setAddons] = useState<ServiceType[]>(() =>
        JSON.parse(localStorage.getItem("addOns") || "[]")
    );

    const handleAddons = ({title, price}: ServiceType) => {
        const currentAddons = [...addons];

        const existingAddon = currentAddons.find((item: ServiceType) => item.title === title)

        if (existingAddon) {
            setAddons(currentAddons.filter(item => item.title !== title))
            return
        } else {
            currentAddons.push({title, price: Number(price)});
            setAddons(currentAddons)
        }
    };

    useEffect(() => {
        localStorage.setItem("currentStep", String(currentStep));
        localStorage.setItem("userName", userName.trim());
        localStorage.setItem("email", email.trim());
        localStorage.setItem("phoneNumber", phoneNumber.trim());
        localStorage.setItem("addOns", JSON.stringify(addons).trim());
    }, [currentStep, userName, email, phoneNumber, addons])

    const handlePreviousStep = () => {
        if (currentStep === 1) return;
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

        if (currentStep == 3) {
            const addonsExist = addons.length > 0;
            if (!addonsExist) {
                alert("Please select at least one add-on");
                return;
            }
        }

        setCurrentStep((prevStep) => prevStep + 1);
    };

    const updateField: UpdateFieldType = (setState) => (event: React.ChangeEvent<HTMLInputElement>) => setState(event.target.value);

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
                        updateUserName={updateField(setUserName)}
                        updateEmail={updateField(setEmail)}
                        updatePhoneNumber={updateField(setPhoneNumber)}
                    />
                )}

                {/*plan*/}
                {currentStep === 2 && <Plan/>}

                {/*add-ons*/}
                {currentStep === 3 && <AddOns addons={addons} handleAddons={handleAddons}/>}

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
