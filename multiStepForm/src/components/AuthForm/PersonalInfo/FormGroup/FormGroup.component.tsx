import {FormGroupType} from "../../../../types.ts";
import {useCallback, useEffect, useState} from "react";
import useDebounce from "../../../../utils/debounce.ts";
import {useAppSelector} from "../../../../hooks/useAppSelector.ts";
import {selectFormData} from "../../../../features/Form/FormSlice.tsx";

const FormGroup = ({
                       label,
                       inputType,
                       placeholder,
                       value,
                       errorMsg,
                       updateForm,
                   }: FormGroupType) => {
    const [currentValue, setCurrentValue] = useState(value);

    const debouncedUpdateForm = useCallback(
        useDebounce((updatedValue: string) => updateForm(updatedValue), 300),
        [updateForm, value]
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const eventValue = e.target.value;
        setCurrentValue(eventValue);
        debouncedUpdateForm(eventValue);
    };

    const formData = useAppSelector(selectFormData)
    useEffect(() => {
        setCurrentValue(value);
    }, [formData, value])

    return (
        <div className="form-group">
            <div className="form-group__label">
                <label htmlFor={label.split(" ").join("")}>{label}</label>
                {errorMsg && <p className="error__message">{errorMsg}</p>}
            </div>
            <input
                className={errorMsg ? "error" : ""}
                id={label.split(" ").join("")}
                type={inputType}
                value={currentValue}
                onChange={handleChange}
                placeholder={placeholder}
            />
        </div>
    );
};

export default FormGroup;
