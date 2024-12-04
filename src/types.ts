import {ChangeEvent} from "react";

type FormOnChangeType = (event: ChangeEvent<HTMLInputElement>) => void;
export type FormGroupType = {
    label: string;
    inputType: string;
    placeholder: string;
    value: string;
    errorMsg: string;
    onChange: FormOnChangeType;
};

export type UpdateFieldType = (
    fieldName: string,
    setState: React.Dispatch<React.SetStateAction<string>>
) => (event: React.ChangeEvent<HTMLInputElement>) => void;


export type PersonalInfoType = {
    userName: string;
    email: string;
    phoneNumber: string;
    userErrorMsg: string;
    emailErrorMsg: string;
    phoneErrorMsg: string;
    updateUserName: FormOnChangeType;
    updateEmail: FormOnChangeType;
    updatePhoneNumber: FormOnChangeType;
}

export type PlanCardType = {
    icon: string;
    plan: string;
    price: string;
    freeTrial?: string;
}