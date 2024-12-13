import Header from "../Header/Header.component.tsx";
import Cards from "./Card/Cards.component.tsx";
import TimeFrameToogler from "./TimeFrameToggler/TimeFrameToggler.component.tsx";
import { PlanType } from "../../../types.ts";

const Plan = ({ plan, timeFrame, planErr }: PlanType) => {
  return (
    <div className="plan wrapper">
      <Header
        description="You have the option of monthly or yearly billing."
        title="Select your plan"
      />

      {planErr && <p className={"error"}>{planErr}</p>}
      <Cards plan={plan} timeFrame={timeFrame} />
      <TimeFrameToogler timeFrame={timeFrame} />
    </div>
  );
};

export default Plan;
