import { useState } from "react";

const useMultiForm = (totalSteps: number) => {
  const [currentIndex, setCurrentIndex] = useState(
    () => Number(localStorage.getItem("currentIndex")) || 0
  );

  const prevStep = () => {
    if (currentIndex === 0) return;
    setCurrentIndex(currentIndex - 1);
    localStorage.setItem("currentIndex", String(currentIndex - 1));
  };

  const nextStep = () => {
    if (currentIndex === totalSteps - 1) return;
    setCurrentIndex(currentIndex + 1);
    localStorage.setItem("currentIndex", String(currentIndex + 1));
  };

  const goToStep = (step: number) => {
    setCurrentIndex(step - 1);
    localStorage.setItem("currentIndex", String(step - 1));
  };

  const reset = () => {
    // localStorage.removeItem("isComplete");
    localStorage.removeItem("inProgress");
    localStorage.removeItem("formData");
    localStorage.removeItem("currentIndex");
  };

  return {
    currentIndex,
    prevStep,
    nextStep,
    goToStep,
    reset,
    isFirstStep: currentIndex === 0,
    isLastStep: currentIndex === totalSteps - 1,
  };
};

export default useMultiForm;
