import { useEffect, useState } from "react";
import "./authform.styles.css";
import PersonalInfo from "./PersonalInfo/PersonalInfo.component";
import { FormItems } from "../../types";
import Plan from "./Plan/Plan.component";
import AddOns from "./Add-ons/AddOns.component.tsx";
import Summary from "./Summary/Summary.component.tsx";
import { useNavigate } from "react-router-dom";
import useMultiForm from "../../utils/useMultiForm.ts";
import StepContainer from "./PersonalInfo/Step/StepContainer.component.tsx";
import formFieldValidation from "../../utils/form.field.validation.ts";

const initialValues: FormItems = {
  name: "",
  email: "",
  phoneNumber: "",
  timeFrame: "monthly",
  plan: { price: 9, title: "arcade" },
  addons: [],
};

function AuthForm() {
  const [formData, setFormData] = useState<FormItems>(() => {
    const storedFormData = localStorage.getItem("formData");
    return storedFormData ? JSON.parse(storedFormData) : initialValues;
  });

  const [errors, setErrors] = useState({
    nameErr: "",
    emailErr: "",
    phoneNumberErr: "",
    addonsErr: "",
  });

  const [summaryErr, setSummaryErr] = useState("");

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
    let formIsValid = false;
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

      // If no errors, proceed
      if (
        newErrors.emailErr === "" &&
        newErrors.nameErr === "" &&
        newErrors.phoneNumberErr === ""
      ) {
        formIsValid = true;
      }
    }

    if (currentIndex === 2) {
      const newErrors = {
        addonsErr: formFieldValidation("addons", formData.addons.join(",")),
      };

      setErrors((prevErrors) => ({ ...prevErrors, ...newErrors }));

      // If no errors, proceed
      if (newErrors.addonsErr === "") {
        formIsValid = true;
      }
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
        formIsValid = true;
        console.log("complete");
        return;
      } else {
        setSummaryErr("please complete the form before submitting");
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
        // complete={complete}
      />

      <div className="auth__form-container">
        {currentIndex === 0 && (
          <PersonalInfo {...formData} updateForm={updateForm} {...errors} />
        )}
        {currentIndex === 1 && <Plan {...formData} updateForm={updateForm} />}
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
      </div>
    </div>
  );
}

export default AuthForm;
