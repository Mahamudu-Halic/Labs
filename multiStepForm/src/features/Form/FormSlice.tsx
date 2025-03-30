import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Errors, FormItems } from "../../types.ts";
import { initialErrorValues, initialValues } from "../../constant.ts";
import formFieldValidation from "../../utils/form.field.validation.ts";
import { RootState } from "../../store.ts";

interface FormState {
  formData: FormItems;
  errors: Errors;
}

const initialState: FormState = {
  formData: initialValues,
  errors: initialErrorValues,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateForm(
      state: FormState,
      action: PayloadAction<{
        fieldToUpdate: Partial<FormItems>;
        field?: keyof FormItems;
      }>
    ) {
      const { fieldToUpdate, field } = action.payload;
      state.formData = { ...state.formData, ...fieldToUpdate };

      state.errors.summaryErr = "";

      if (field) {
        state.errors = {
          ...state.errors,
          [`${field}Err`]: formFieldValidation(
            field,
            fieldToUpdate[field] as string
          ),
        };
      }
    },

    goToStep(state: FormState, action: PayloadAction<{ step: number }>) {
      const { step } = action.payload;
      if (step >= 0 && step <= 4) {
        state.formData.currentStep = step;
      }
    },

    nextStep(state: FormState) {
      const { formData } = state;
      const newErrors = {
        nameErr: formFieldValidation("name", formData.name),
        emailErr: formFieldValidation("email", formData.email),
        phoneNumberErr: formFieldValidation(
          "phoneNumber",
          formData.phoneNumber
        ),
        planErr: formFieldValidation("plan", `${formData.plan}`),
      };

      if (formData.currentStep === 0) {
        state.errors.nameErr = newErrors.nameErr;
        state.errors.emailErr = newErrors.emailErr;
        state.errors.phoneNumberErr = newErrors.phoneNumberErr;

        if (
          newErrors.emailErr ||
          newErrors.nameErr ||
          newErrors.phoneNumberErr
        ) {
          return;
        }
      }

      if (formData.currentStep === 1) {
        state.errors.planErr = newErrors.planErr;
        if (newErrors.planErr) {
          return;
        }
      }

      state.formData.currentStep++;
    },

    prevStep(state: FormState) {
      if (state.formData.currentStep > 0) {
        state.formData.currentStep--;
      }
    },

    resetForm(state: FormState) {
      state.formData = initialValues;
      state.errors = initialErrorValues;
    },

    submitForm(state: FormState) {
      const { formData } = state;
      const errors = {
        nameErr: formFieldValidation("name", formData.name),
        emailErr: formFieldValidation("email", formData.email),
        phoneNumberErr: formFieldValidation(
          "phoneNumber",
          formData.phoneNumber
        ),
        planErr: formFieldValidation("plan", `${formData.plan}`),
      };
      state.errors = { ...state.errors, ...errors };
      if (
        errors.emailErr ||
        errors.nameErr ||
        errors.phoneNumberErr ||
        errors.planErr
      ) {
        state.errors.summaryErr = "please complete the form before submitting";
        return;
      }

      formData.isComplete = true;
    },
  },
});

export const {
  updateForm,
  resetForm,
  nextStep,
  prevStep,
  goToStep,
  submitForm,
} = formSlice.actions;

export const selectFormData = (state: RootState) => state.form.formData;
export const selectFormErrors = (state: RootState) => state.form.errors;
export const selectCurrentStep = (state: RootState) =>
  state.form.formData.currentStep;
export const selectIsComplete = (state: RootState) =>
  state.form.formData.isComplete;

export default formSlice.reducer;
