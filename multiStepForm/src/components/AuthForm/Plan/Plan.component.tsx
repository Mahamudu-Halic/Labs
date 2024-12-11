import Header from "../Header/Header.component.tsx";
import Cards from "./Card/Cards.component.tsx";
import TimeFrameToogler from "./TimeFrameToggler/TimeFrameToggler.component.tsx";
import {PlanType} from "../../../types.ts";
import {updateForm} from "../../../features/Form/FormSlice.tsx";
import {useAppDispatch} from "../../../hooks/useAppDispatch.ts";

const Plan = ({plan, timeFrame, planErr}: PlanType) => {
    const dispatch = useAppDispatch()
    return (
        <div className="plan wrapper">
            <Header
                description="You have the option of monthly or yearly billing."
                title="Select your plan"
            />

            {planErr && <p className={"error"}>{planErr}</p>}
            <Cards
                plan={plan}
                updateForm={({title, price}) => dispatch(updateForm({fieldToUpdate: {plan: {title, price}}}))
                }
                timeFrame={timeFrame}
            />
            <TimeFrameToogler
                timeFrame={timeFrame}
                updateForm={(value) => dispatch(updateForm({fieldToUpdate: {timeFrame: value}}))}
            />

        </div>
    );
};

export default Plan;
