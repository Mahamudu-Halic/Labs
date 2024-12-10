import Header from "../Header/Header.component.tsx";
import Cards from "./Card/Cards.component.tsx";
import TimeFrameToogler from "./TimeFrameToggler/TimeFrameToggler.component.tsx";
import {PlanType} from "../../../types.ts";

const Plan = ({reset, plan, updateForm, timeFrame, planErr}: PlanType) => {
    return (
        <div className="plan wrapper">
            <Header
                description="You have the option of monthly or yearly billing."
                title="Select your plan"
                reset={reset}
            />

            {planErr && <p className={"error"}>{planErr}</p>}
            <Cards
                plan={plan}
                updateForm={({title, price}) =>
                    updateForm({plan: {title, price}})
                }
                timeFrame={timeFrame}
            />
            <TimeFrameToogler
                timeFrame={timeFrame}
                updateForm={(value) => updateForm({timeFrame: value})}
            />

        </div>
    );
};

export default Plan;
