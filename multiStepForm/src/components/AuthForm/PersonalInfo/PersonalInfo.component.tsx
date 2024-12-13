import Header from "../Header/Header.component.tsx";
import FormGroup from "./FormGroup/FormGroup.component.tsx";

import "./personal-info.styles.css";
import {
  selectFormData,
  selectFormErrors,
  updateForm,
} from "../../../features/Form/FormSlice.tsx";
import { useAppDispatch } from "../../../hooks/useAppDispatch.ts";
import { useAppSelector } from "../../../hooks/useAppSelector.ts";

const PersonalInfo = () => {
  const { name, email, phoneNumber } = useAppSelector(selectFormData);
  const { nameErr, emailErr, phoneNumberErr } =
    useAppSelector(selectFormErrors);
  const dispatch = useAppDispatch();
  return (
    <div className="personal-info wrapper">
      <Header
        title="Personal Info"
        description="Please provide your name, email address, and phone number."
      />

      <form>
        <FormGroup
          inputType="text"
          label="Name"
          placeholder="e.g. Stephen King"
          value={name}
          updateForm={(value: string) =>
            dispatch(
              updateForm({ fieldToUpdate: { name: value }, field: "name" })
            )
          }
          errorMsg={nameErr}
        />
        <FormGroup
          inputType="email"
          label="Email address"
          placeholder="e.g. john.doe@example.com"
          value={email}
          updateForm={(value) =>
            dispatch(
              updateForm({ fieldToUpdate: { email: value }, field: "email" })
            )
          }
          errorMsg={emailErr}
        />
        <FormGroup
          inputType="tel"
          label="Phone number"
          placeholder="e.g. +1 234 567 890"
          value={phoneNumber}
          updateForm={(value) =>
            dispatch(
              updateForm({
                fieldToUpdate: { phoneNumber: value },
                field: "phoneNumber",
              })
            )
          }
          errorMsg={phoneNumberErr}
        />
      </form>
    </div>
  );
};

export default PersonalInfo;
