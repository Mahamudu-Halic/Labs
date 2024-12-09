export type FormItems = {
    name: string;
    email: string;
    phoneNumber: string;
    timeFrame: string;
    plan: Plan | undefined;
    addons: AddonType[];
};

export type FormGroupType = {
    label: string;
    inputType: string;
    placeholder: string;
    value: string | undefined;
    errorMsg?: string;
    updateForm: (value: string, field?: string) => void;
};

export type Errors = {
    nameErr: string;
    emailErr: string;
    phoneNumberErr: string;
    planErr: string;
};

export type StepTypes = Partial<FormItems> & {
    updateForm: (
        fieldToUpdate: Partial<FormItems>,
        field?: keyof FormItems
    ) => void;
};

export type PersonalInfoType = StepTypes & Partial<Errors> & { reset: () => void };

export type PlanType = StepTypes & Partial<Errors> & { reset: () => void };
export type Plan = {
    title: string;
    price: number;
};

export type PlanCardType = {
    icon: string;
    title: string;
    price: number;
};

export type TimeFrameType = Partial<FormItems> & {
    updateForm: (value: string) => void;
};

export type CardsType = Partial<FormItems> & {
    updateForm: (value: Plan) => void;
};

export type AddonsType = StepTypes & {
    reset: () => void;
};

export type AddonType = {
    title: string;
    price: number;
};

export type AddOnsListType = {
    key: string;
    title: string;
    description: string;
    price: number;
};

export type SummaryType = Partial<StepTypes> & {
    navigateTo: (value: number) => void;
    error: string;
    reset: () => void;
};
