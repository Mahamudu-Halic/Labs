import React from "react";
import Header from "../Header/Header.component";
import Cards from "./Cards.component";
import "./plan.styles.css"
const Plan = () => {
  return (
    <div className="plan wrapper">
      <Header
        description="You have the option of monthly or yearly billing."
        title="Select your plan"
      />

      <Cards />
    </div>
  );
};

export default Plan;
