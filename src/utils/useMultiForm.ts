import React, { ReactElement, useState } from 'react'

const useMultiForm = (totalSteps: number) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const prevStep = () => {
        if(currentIndex === 0) return
        setCurrentIndex(currentIndex - 1)
    }

    const nextStep = () => {
        if(currentIndex === totalSteps - 1) return
        setCurrentIndex(currentIndex + 1)
    }

    const goToStep = (step: number) => setCurrentIndex(step - 1)
  return {
      currentIndex,
      prevStep,
      nextStep,
      goToStep,
      isFirstStep: currentIndex === 0,
      isLastStep: currentIndex === totalSteps - 1
  }
}

export default useMultiForm