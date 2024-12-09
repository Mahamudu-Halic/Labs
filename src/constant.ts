import {AddOnsListType, Errors, FormItems, PlanCardType} from "./types.ts";

export const initialValues: FormItems = {
    name: "",
    email: "",
    phoneNumber: "",
    timeFrame: "monthly",
    plan: undefined,
    addons: [],
};

export const initialErrorValues: Errors = {
    nameErr: "",
    emailErr: "",
    phoneNumberErr: "",
    planErr: "",
};

export const StepItems = [
    {step: 1, description: "Your Info"},
    {step: 2, description: "Select Plan"},
    {step: 3, description: "Add-ons"},
    {step: 4, description: "Summary"},
];

export const AddonsList: AddOnsListType[] = [
    {
        key: "online-service",
        title: "Online service",
        description: "Access to multiple games",
        price: 1,
    },
    {
        key: "large-storage",
        title: "Larger storage",
        description: "Extra 1TB of cloud save",
        price: 2,
    },
    {
        key: "customizable-profile",
        title: "Customizable profile",
        description: "Custom theme on your profile",
        price: 2,
    },
];

export const CardItems: PlanCardType[] = [
    {
        icon: "./assets/images/icon-arcade.svg",
        title: "arcade",
        price: 9,
    },
    {
        icon: "./assets/images/icon-advanced.svg",
        title: "advanced",
        price: 12,
    },
    {
        icon: "./assets/images/icon-pro.svg",
        title: "pro",
        price: 15,
    },
];