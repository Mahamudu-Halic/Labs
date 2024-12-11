import PersonalInfo from "./PersonalInfo/PersonalInfo.component.tsx";
import Plan from "./Plan/Plan.component.tsx";
import AddOns from "./Add-ons/AddOns.component.tsx";
import Summary from "./Summary/Summary.component.tsx";
import StepContainer from "./Step/StepContainer.component.tsx";
import ThankYou from "./ThankYou/ThankYou.component.tsx";

import "./authform.styles.css";
import {
    nextStep,
    prevStep,
    selectCurrentStep,
    selectFormData,
    selectFormErrors,
    selectIsComplete,
    selectIsValid, validateStep
} from "../../features/Form/FormSlice.tsx";
import {useAppDispatch} from "../../hooks/useAppDispatch.ts";
import {useAppSelector} from "../../hooks/useAppSelector.ts";
import {Errors, FormItems} from "../../types.ts";
import {useEffect} from "react";


function AuthForm() {
    const dispatch = useAppDispatch();
    const formData: FormItems = useAppSelector(selectFormData);
    const errors: Errors = useAppSelector(selectFormErrors);
    const currentStep: number = useAppSelector(selectCurrentStep)
    const isValid = useAppSelector(selectIsValid)
    const isComplete = useAppSelector(selectIsComplete)


    // const handleStepValidation = () => {
    //     if (currentStep === 3) {
    //
    //         if (Object.values(newErrors).every((error) => error === "")) {
    //             setIsComplete(true);
    //             reset();
    //             return;
    //         } else {
    //             setErrors((prevErrors) => ({...prevErrors, summaryErr: "please complete the form before submitting"}));
    //             return;
    //         }
    //     }
    //
    //     if (formIsValid) setCurrentStep(() => nextStep(currentStep, totalSteps));
    // };


    const handleNextStep = () => {
        dispatch(validateStep())

    }

    useEffect(() => {
        console.log(isValid)
        if (isValid) {
            dispatch(nextStep());
        }
    }, [formData, isValid]);

    return (
        <div className="auth__form">
            <StepContainer
                currentStep={currentStep}
                complete={isComplete}
            />

            <div className="auth__form-container">
                {!isComplete && (
                    <>
                        {currentStep === 0 && (
                            <PersonalInfo {...formData} {...errors} />
                        )}
                        {currentStep === 1 && (
                            <Plan {...formData} planErr={errors.planErr}/>
                        )}
                        {currentStep === 2 && (
                            <AddOns {...formData}/>
                        )}
                        {currentStep === 3 && (
                            <Summary
                                {...formData}
                                summaryErr={errors.summaryErr}
                            />
                        )}
                    </>
                )}

                {isComplete && <ThankYou/>}

                {!isComplete && (
                    <div className="auth__form-button-container">
                        {currentStep === 0 && (
                            <button
                                onClick={() => dispatch(prevStep())}
                                className="auth__form-prev-button"
                            >
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
                )}
            </div>
        </div>
    );
}

export default AuthForm;
