import Header from "../Header/Header.component";
import Cards from "./Card/Cards.component.tsx";
import "./plan.styles.css"
import TimeFrameToogler from "./TimeFrameToggler/TimeFrameToggler.component.tsx";
import {useEffect, useState} from "react";

const Plan = () => {
    const [plan, setPlan] = useState<string>(() => localStorage.getItem("plan") || "arcade")
    const [timeFrame, setTimeFrame] = useState<string>(() => localStorage.getItem("timeframe") || "monthly");

    const handlePlan = (title: string) => {
        setPlan(title)
    };

    const handleTimeFrame = () => {
        setTimeFrame(timeFrame === "monthly" ? "yearly" : "monthly");
    }

    useEffect(() => {
        localStorage.setItem('plan', plan);
        localStorage.setItem('timeframe', timeFrame);
    }, [plan, timeFrame])

    return (
        <div className="plan wrapper">
            <Header
                description="You have the option of monthly or yearly billing."
                title="Select your plan"
            />

            <Cards plan={plan} handlePlan={handlePlan} timeFrame={timeFrame}/>
            <TimeFrameToogler timeFrame={timeFrame} handleTimeFrame={handleTimeFrame}/>
        </div>
    );
};

export default Plan;
