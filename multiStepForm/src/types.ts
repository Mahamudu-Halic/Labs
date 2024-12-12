export type FormItems = {
    name: string;
    email: string;
    phoneNumber: string;
    timeFrame: string;
    plan: Plan | undefined;
    addons: AddonType[];
    currentStep: number;
    isComplete: boolean;
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
    summaryErr: string;
};

export type StepTypes = Partial<FormItems>

export type PersonalInfoType = StepTypes & Partial<Errors>;

export type PlanType = StepTypes & Partial<Errors>;
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

export type AddonsType = StepTypes

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

export type SummaryType = Partial<StepTypes> & Partial<Errors>