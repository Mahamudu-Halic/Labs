import Header from "../Header/Header.component.tsx";
import Cards from "./Card/Cards.component.tsx";
import TimeFrameToogler from "./TimeFrameToggler/TimeFrameToggler.component.tsx";
import { useAppSelector } from "../../../hooks/useAppSelector.ts";
import {
  selectFormData,
  selectFormErrors,
} from "../../../features/Form/FormSlice.tsx";

const Plan = () => {
  const { planErr } = useAppSelector(selectFormErrors);
  return (
    <div className="plan wrapper">
      <Header
        description="You have the option of monthly or yearly billing."
        title="Select your plan"
      />

      {planErr && <p className={"error"}>{planErr}</p>}
      <Cards />
      <TimeFrameToogler />
    </div>
  );
};

export default Plan;
