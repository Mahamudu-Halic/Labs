import {useEffect, useState} from "react";
import PersonalInfo from "./PersonalInfo/PersonalInfo.component.tsx";
import {FormItems} from "../../types.ts";
import Plan from "./Plan/Plan.component.tsx";
import AddOns from "./Add-ons/AddOns.component.tsx";
import Summary from "./Summary/Summary.component.tsx";
import StepContainer from "./Step/StepContainer.component.tsx";
import formFieldValidation from "../../utils/form.field.validation.ts";
import ThankYou from "./ThankYou/ThankYou.component.tsx";

import "./authform.styles.css";
import {
    goToStep,
    isFirstStep,
    isLastStep,
    nextStep,
    prevStep,
} from "../../utils/useMultiForm.ts";
import {initialErrorValues, initialValues} from "../../constant.ts";

const totalSteps: number = 4;

function AuthForm() {
    const [formData, setFormData] = useState<FormItems>(() =>
        JSON.parse(
            localStorage.getItem("formData") || JSON.stringify(initialValues)
        )
    );

    const [errors, setErrors] = useState(initialErrorValues);

    const [summaryErr, setSummaryErr] = useState("");
    const [isComplete, setIsComplete] = useState(false);

    const [currentStep, setCurrentStep] = useState(
        Number(localStorage.getItem("currentStep")) || 0
    );

    const updateForm = (
        fieldToUpdate: Partial<FormItems>,
        field?: keyof FormItems
    ) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            ...fieldToUpdate,
        }));

        if (field) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [`${field}Err`]: formFieldValidation(
                    field,
                    fieldToUpdate[field] as string
                ),
            }));
        }

        setSummaryErr("");
        setErrors((prevErrs) => ({
            ...prevErrs,
            planErr: "",
        }));
    };

    const handleGoToStep = (step: number) => {
        setCurrentStep(() => goToStep(step));
    };
    const handleStepValidation = () => {
        let formIsValid = true;
        // setSummaryErr("");

        if (currentStep === 0) {
            const newErrors = {
                nameErr: formFieldValidation("name", formData.name),
                emailErr: formFieldValidation("email", formData.email),
                phoneNumberErr: formFieldValidation(
                    "phoneNumber",
                    formData.phoneNumber
                ),
            };

            setErrors((prevErrors) => ({...prevErrors, ...newErrors}));

            if (newErrors.emailErr || newErrors.nameErr || newErrors.phoneNumberErr)
                formIsValid = false;
        }

        if (currentStep === 1) {
            const newErrors = {
                planErr: formFieldValidation("plan", `${formData.plan}`),
            };

            setErrors((prevErrors) => ({...prevErrors, ...newErrors}));

            if (newErrors.planErr) formIsValid = false;
        }

        if (currentStep === 3) {
            const newErrors = {
                nameErr: formFieldValidation("name", formData.name),
                emailErr: formFieldValidation("email", formData.email),
                phoneNumberErr: formFieldValidation(
                    "phoneNumber",
                    formData.phoneNumber
                ),
                planErr: formFieldValidation("plan", `${formData.plan}`),
            };
            if (Object.values(newErrors).every((error) => error === "")) {
                setIsComplete(true);
                reset();
                return;
            } else {
                setSummaryErr("please complete the form before submitting");
                return;
            }
        }

        if (formIsValid) setCurrentStep(() => nextStep(currentStep, totalSteps));
    };

    const reset = () => {
        setFormData(initialValues);
        setErrors(initialErrorValues);
        localStorage.removeItem("formData");
        localStorage.removeItem("currentStep");
    };

    useEffect(() => {
        localStorage.setItem("currentStep", String(currentStep));
    }, [currentStep]);

    useEffect(() => {
        localStorage.setItem("formData", JSON.stringify(formData));
    }, [formData]);

    return (
        <div className="auth__form">
            <StepContainer
                currentStep={currentStep}
                navigateTo={handleGoToStep}
                complete={isComplete}
            />

            <div className="auth__form-container">
                {!isComplete && (
                    <>
                        {currentStep === 0 && (
                            <PersonalInfo {...formData} reset={reset} updateForm={updateForm} {...errors} />
                        )}
                        {currentStep === 1 && (
                            <Plan {...formData} reset={reset} updateForm={updateForm}  {...errors}/>
                        )}
                        {currentStep === 2 && (
                            <AddOns {...formData} reset={reset} updateForm={updateForm}/>
                        )}
                        {currentStep === 3 && (
                            <Summary
                                {...formData}
                                reset={reset} updateForm={updateForm}
                                navigateTo={handleGoToStep}
                                error={summaryErr}
                            />
                        )}
                    </>
                )}

                {isComplete && <ThankYou/>}

                {!isComplete && (
                    <div className="auth__form-button-container">
                        {!isFirstStep(currentStep) && (
                            <button
                                onClick={() => setCurrentStep(() => prevStep(currentStep))}
                                className="auth__form-prev-button"
                            >
                                go back
                            </button>
                        )}
                        <button
                            onClick={handleStepValidation}
                            className={`auth__form-button ${
                                isLastStep(currentStep, totalSteps) ? "confirm" : ""
                            }`}
                        >
                            {isLastStep(currentStep, totalSteps) ? "Confirm" : "Next Step"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AuthForm;
