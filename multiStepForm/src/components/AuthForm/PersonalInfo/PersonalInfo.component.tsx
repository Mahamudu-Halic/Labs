import { FormInputList } from "../../../constant.ts";
import Header from "../Header/Header.component.tsx";
import FormGroup from "./FormGroup/FormGroup.component.tsx";

import "./personal-info.styles.css";

const PersonalInfo = () => {
  return (
    <div className="personal-info wrapper">
      <Header
        title="Personal Info"
        description="Please provide your name, email address, and phone number."
      />

      <form>
        {FormInputList.map((formItem) => (
          <FormGroup key={formItem.field} {...formItem} />
        ))}
      </form>
    </div>
  );
};

export default PersonalInfo;
