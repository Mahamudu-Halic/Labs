import { useEffect, useState } from "react";
import PersonalInfo from "./PersonalInfo/PersonalInfo.component";
import { FormItems } from "../../types";
import Plan from "./Plan/Plan.component";
import AddOns from "./Add-ons/AddOns.component.tsx";
import Summary from "./Summary/Summary.component.tsx";
import { useNavigate } from "react-router-dom";
import useMultiForm from "../../utils/useMultiForm.ts";
import StepContainer from "./PersonalInfo/Step/StepContainer.component.tsx";
import formFieldValidation from "../../utils/form.field.validation.ts";
import ThankYou from "./ThankYou/ThankYou.component.tsx";

import "./authform.styles.css";

const initialValues: FormItems = {
  name: "",
  email: "",
  phoneNumber: "",
  timeFrame: "monthly",
  plan: { price: 9, title: "arcade" },
  addons: [],
};

const initialErrorValues = {
  nameErr: "",
  emailErr: "",
  phoneNumberErr: "",
  addonsErr: "",
};

function AuthForm() {
  const [formData, setFormData] = useState<FormItems>(() => {
    const storedFormData = localStorage.getItem("formData");
    return storedFormData ? JSON.parse(storedFormData) : initialValues;
  });

  const [errors, setErrors] = useState(initialErrorValues);

  const [summaryErr, setSummaryErr] = useState("");
  const [isComplete, setIsComplete] = useState(() =>
    JSON.parse(localStorage.getItem("isComplete") || "false")
  );

  const navigate = useNavigate();

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
  };

  const {
    nextStep,
    prevStep,
    currentIndex,
    isFirstStep,
    isLastStep,
    goToStep,
  } = useMultiForm(4);

  const handleStepValidation = () => {
    // Check for any remaining errors
    let formIsValid = true;
    setSummaryErr("");

    if (currentIndex === 0) {
      const newErrors = {
        nameErr: formFieldValidation("name", formData.name),
        emailErr: formFieldValidation("email", formData.email),
        phoneNumberErr: formFieldValidation(
          "phoneNumber",
          formData.phoneNumber
        ),
      };

      setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));

      if (newErrors.emailErr || newErrors.nameErr || newErrors.phoneNumberErr)
        formIsValid = false;
    }

    if (currentIndex === 2) {
      const newErrors = {
        addonsErr: formFieldValidation("addons", formData.addons.join(",")),
      };

      setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));

      if (newErrors.addonsErr) formIsValid = false;
    }

    if (currentIndex === 3) {
      const newErrors = {
        nameErr: formFieldValidation("name", formData.name),
        emailErr: formFieldValidation("email", formData.email),
        phoneNumberErr: formFieldValidation(
          "phoneNumber",
          formData.phoneNumber
        ),
        addonsErr: formFieldValidation("addons", formData.addons.join(",")),
      };
      if (Object.values(newErrors).every((error) => error === "")) {
        setIsComplete(true);
        localStorage.setItem("isComplete", "true");
        localStorage.removeItem("formData");
        setTimeout(() => {
          localStorage.removeItem("isComplete");
          navigate("/");
        }, 3000);
        return;
      } else {
        setSummaryErr("please complete the form before submitting");
        return;
      }
    }

    formIsValid && nextStep();
  };

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  return (
    <div className="auth__form">
      <StepContainer
        currentStep={currentIndex}
        navigateTo={goToStep}
        complete={isComplete}
      />

      <div className="auth__form-container">
        {!isComplete && (
          <>
            {currentIndex === 0 && (
              <PersonalInfo {...formData} updateForm={updateForm} {...errors} />
            )}
            {currentIndex === 1 && (
              <Plan {...formData} updateForm={updateForm} />
            )}
            {currentIndex === 2 && (
              <AddOns {...formData} updateForm={updateForm} {...errors} />
            )}
            {currentIndex === 3 && (
              <Summary
                {...formData}
                updateForm={updateForm}
                navigateTo={goToStep}
                error={summaryErr}
              />
            )}
          </>
        )}

        {isComplete && <ThankYou />}

        {!isComplete && (
          <div className="auth__form-button-container">
            {!isFirstStep && (
              <button onClick={prevStep} className="auth__form-prev-button">
                go back
              </button>
            )}
            <button
              onClick={handleStepValidation}
              className={`auth__form-button ${isLastStep ? "confirm" : ""}`}
            >
              {isLastStep ? "Confirm" : "Next Step"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthForm;
