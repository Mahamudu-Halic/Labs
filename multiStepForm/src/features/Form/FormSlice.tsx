import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Errors, FormItems} from "../../types.ts";
import {initialErrorValues, initialValues} from "../../constant.ts";
import formFieldValidation from "../../utils/form.field.validation.ts";
import {RootState} from "../../store.ts";

interface FormState {
    formData: FormItems,
    errors: Errors,
}

const initialState: FormState = {
    formData: initialValues,
    errors: initialErrorValues,
}

const formSlice = createSlice({
    name: "form",
    initialState,
    reducers: {
        updateForm(state, action: PayloadAction<{ fieldToUpdate: Partial<FormItems>, field?: keyof FormItems }>) {
            const {fieldToUpdate, field} = action.payload;
            state.formData = {...state.formData, ...fieldToUpdate};

            if (field) {
                state.errors = {
                    ...state.errors,
                    [`${field}Err`]: formFieldValidation(field, fieldToUpdate[field] as string),
                };
            }

        },

        goToStep(state, action: PayloadAction<{ step: number }>) {
            const {step} = action.payload;
            if (step >= 0 && step <= 4) {
                state.formData.currentStep = step;
            }
        },

        nextStep(state) {
            if (state.formData.currentStep < 4) {
                state.formData.currentStep++;
            }
        },

        prevStep(state) {
            if (state.formData.currentStep > 0) {
                state.formData.currentStep--;
            }
        },

        resetForm(state) {
            state.formData = initialValues;
            state.errors = initialErrorValues;
        },

        validateStep(state) {
            const {formData} = state;

            if (formData.currentStep === 0) {
                const newErrors = {
                    nameErr: formFieldValidation("name", formData.name),
                    emailErr: formFieldValidation("email", formData.email),
                    phoneNumberErr: formFieldValidation(
                        "phoneNumber",
                        formData.phoneNumber
                    ),
                }
                state.errors = {...state.errors, ...newErrors};
                if (newErrors.emailErr && newErrors.nameErr && newErrors.phoneNumberErr) return state.state.formData.isValid = true;
            }

            if (formData.currentStep === 1) {
                const newError = {
                    planErr: formFieldValidation("plan", `${formData.plan}`),
                }

                state.errors = {...state.errors, ...newError};
                if (newError.planErr) return state.formData.isValid = true;
            }

            if (formData.currentStep === 3) {
                const errors = {
                    nameErr: formFieldValidation("name", formData.name),
                    emailErr: formFieldValidation("email", formData.email),
                    phoneNumberErr: formFieldValidation(
                        "phoneNumber",
                        formData.phoneNumber
                    ),
                    planErr: formFieldValidation("plan", `${formData.plan}`),
                }
                state.errors = {...state.errors, ...errors};
                if (errors.emailErr && errors.nameErr && errors.phoneNumberErr && errors.planErr) {
                    state.formData.isValid = true;
                    formData.isComplete = true;
                }
            }
        }
    }
});

export const {updateForm, resetForm, nextStep, prevStep, goToStep, validateStep} = formSlice.actions;

export const selectFormData = (state: RootState) => state.form.formData;
export const selectFormErrors = (state: RootState) => state.form.errors;
export const selectCurrentStep = (state: RootState) => state.form.formData.currentStep;
export const selectIsValid = (state: RootState) => state.form.formData.isValid;
export const selectIsComplete = (state: RootState) => state.form.formData.isComplete;

export default formSlice.reducer;