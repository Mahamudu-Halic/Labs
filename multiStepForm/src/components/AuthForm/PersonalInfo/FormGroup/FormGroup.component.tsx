import { FormGroupType } from "../../../../types.ts";
import { useCallback, useState } from "react";
import useDebounce from "../../../../utils/debounce.ts";
import {
  selectFormData,
  selectFormErrors,
  updateForm,
} from "../../../../features/Form/FormSlice.tsx";
import { useAppDispatch } from "../../../../hooks/useAppDispatch.ts";
import { useAppSelector } from "../../../../hooks/useAppSelector.ts";

const FormGroup = ({ label, type, placeholder, field }: FormGroupType) => {
  const { name, email, phoneNumber } = useAppSelector(selectFormData);
  const [currentValue, setCurrentValue] = useState(
    field === "name" ? name : field === "email" ? email : phoneNumber
  );
  const { nameErr, emailErr, phoneNumberErr } =
    useAppSelector(selectFormErrors);
  const dispatch = useAppDispatch();

  const debouncedUpdateForm = useCallback(
    useDebounce(
      (updatedValue: string) =>
        dispatch(
          updateForm({ fieldToUpdate: { [field]: updatedValue.trim() }, field })
        ),
      300
    ),
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const eventValue = e.target.value;
    setCurrentValue(eventValue);
    debouncedUpdateForm(eventValue);
  };

  return (
    <div className="form-group">
      <div className="form-group__label">
        <label htmlFor={label.split(" ").join("")}>{label}</label>
        {field === "name" && nameErr && (
          <p className="error__message">{nameErr}</p>
        )}
        {field === "email" && emailErr && (
          <p className="error__message">{emailErr}</p>
        )}
        {field === "phoneNumber" && phoneNumberErr && (
          <p className="error__message">{phoneNumberErr}</p>
        )}
      </div>
      <input
        className={
          field === "name" && nameErr
            ? "error"
            : field === "email" && emailErr
            ? "error"
            : field === "phoneNumber" && phoneNumberErr
            ? "error"
            : ""
        }
        id={label.split(" ").join("")}
        type={type}
        value={currentValue}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormGroup;
