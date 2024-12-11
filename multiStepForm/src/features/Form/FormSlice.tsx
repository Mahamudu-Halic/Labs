import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Errors, FormItems} from "../../types.ts";
import {initialErrorValues, initialValues} from "../../constant.ts";
import formFieldValidation from "../../utils/form.field.validation.ts";

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
        }
    }
})

export default formSlice.reducer;