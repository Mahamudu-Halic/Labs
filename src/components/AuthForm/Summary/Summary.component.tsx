import Header from "../Header/Header.component.tsx";
import {AddonType, SummaryType} from "../../../types.ts";

import "./summary.styles.css";

const Summary = ({
                     navigateTo,
                     plan,
                     addons,
                     timeFrame,
                     error,
                     reset
                 }: SummaryType) => {
    const period = timeFrame === "monthly" ? "mo" : "yr";

    // Helper function to calculate prices
    const calculatePrice = (price: number) =>
        timeFrame === "monthly" ? price : price * 10;

    const planPrice = plan ? calculatePrice(plan.price) : 0;
    const totalAddons = addons
        ? addons.reduce(
            (total: number, addon: AddonType) =>
                total + calculatePrice(addon.price),
            0
        )
        : 0;

    const totalPrice = planPrice + totalAddons;

    const summaryAddon =
        addons &&
        addons.map((addon: AddonType) => (
            <div key={addon.title} className="summary__addon">
                <p className="summary__addon-title">{addon.title}</p>
                <p className="summary__addon-price">
                    +${calculatePrice(addon.price)}/{period}
                </p>
            </div>
        ));
    return (
        <div className={"summary wrapper"}>
            <Header
                title={"Finishing up"}
                description={"Double-check everything looks OK before confirming"}
                reset={reset}
            />

            {error && <p className={"summary__error error"}>{error}</p>}
            <div className="summary__container">
                <div className={"summary__plan"}>
                    <div>
                        <h3>
                            {plan?.title || "Please select a plan"} {plan && `(${timeFrame})`}
                        </h3>
                        <button onClick={() => navigateTo(2)}>Change</button>
                    </div>

                    <p>
                        {plan ? `$${planPrice}/${period}` : "N/A"}
                    </p>
                </div>

                <hr/>

                <div className={"summary__addons"}>{summaryAddon}</div>
            </div>
            <div className={"summary__total-container"}>
                <p className={"summary__total-period"}>
                    Total (per {period === "mo" ? "month" : "year"})
                </p>
                <h3 className={"summary__total"}>
                    {plan ? `+$${totalPrice}/${period}` : "N/A"}
                </h3>
            </div>

        </div>
    );
};

export default Summary;
