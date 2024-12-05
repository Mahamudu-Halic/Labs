import Header from "../Header/Header.component";
import {PersonalInfoType} from "../../../types";
import FormGroup from "./FormGroup/FormGroup.component";

import "./personal-info.styles.css"

const PersonalInfo = ({
                          userName,
                          userErrorMsg,
                          email,
                          emailErrorMsg,
                          phoneNumber,
                          phoneErrorMsg,
                          updateUserName,
                          updateEmail,
                          updatePhoneNumber,
                      }: PersonalInfoType) => {

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
                    value={userName}
                    onChange={updateUserName}
                    errorMsg={userErrorMsg}
                />
                <FormGroup
                    inputType="email"
                    label="Email address"
                    placeholder="e.g. john.doe@example.com"
                    value={email}
                    onChange={updateEmail}
                    errorMsg={emailErrorMsg}
                />
                <FormGroup
                    inputType="tel"
                    label="Phone number"
                    placeholder="e.g. +1 234 567 890"
                    value={phoneNumber}
                    onChange={updatePhoneNumber}
                    errorMsg={phoneErrorMsg}
                />
            </form>
        </div>
    );
};

export default PersonalInfo;
