import Header from "../Header/Header.component";
import Cards from "./Card/Cards.component.tsx";
import "./plan.styles.css";
import TimeFrameToogler from "./TimeFrameToggler/TimeFrameToggler.component.tsx";
import { useEffect, useState } from "react";
import { ServiceType, StepTypes } from "../../../types.ts";

const Plan = ({ plan, updateForm, timeFrame }: StepTypes) => {
  // const [plan, setPlan] = useState<ServiceType>(() => {
  //   const storedPlan = localStorage.getItem("plan");
  //   return storedPlan ? JSON.parse(storedPlan) : { title: "arcade", price: 9 };
  // });

  // const [timeFrame, setTimeFrame] = useState<string>(
  //   () => localStorage.getItem("timeframe") || "monthly"
  // );

  // const handlePlan = ({ title, price }: ServiceType) => {
  //   setPlan({ title, price });
  // };

  // const handleTimeFrame = () => {
  //   setTimeFrame(timeFrame === "monthly" ? "yearly" : "monthly");
  // };

  // useEffect(() => {
  //   localStorage.setItem("plan", JSON.stringify(plan));
  //   localStorage.setItem("timeframe", timeFrame);
  // }, [plan, timeFrame]);

  return (
    <div className="plan wrapper">
      <Header
        description="You have the option of monthly or yearly billing."
        title="Select your plan"
      />

      <Cards
        plan={plan}
        updateForm={({title, price}) =>
          updateForm({ plan: { title, price} })
        }
        timeFrame={timeFrame}
      />
      <TimeFrameToogler
        timeFrame={timeFrame}
        updateForm={(value) => updateForm({ timeFrame: value })}
      />
    </div>
  );
};

export default Plan;
