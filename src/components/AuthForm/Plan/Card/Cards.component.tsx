import {PlanCardType} from "../../../../types.ts";

import "./card.styles.css"

const cardItems = {
    monthly: [
        {
            icon: "./assets/images/icon-arcade.svg",
            plan: "arcade",
            price: 9,
            freeTrial: ""
        },
        {
            icon: "./assets/images/icon-advanced.svg",
            plan: "advanced",
            price: 12,
            freeTrial: ""
        },
        {
            icon: "./assets/images/icon-pro.svg",
            plan: "pro",
            price: 15,
            freeTrial: ""
        },
    ],

    yearly: [
        {
            icon: "./assets/images/icon-arcade.svg",
            plan: "arcade",
            price: 90,
            freeTrial: "2 months free",
        },
        {
            icon: "./assets/images/icon-advanced.svg",
            plan: "advanced",
            price: 120,
            freeTrial: "2 months free",
        },
        {
            icon: "./assets/images/icon-pro.svg",
            plan: "pro",
            price: 150,
            freeTrial: "2 months free",
        },
    ],
};

const Cards = ({plan, handlePlan, timeFrame}: {
    plan: string;
    timeFrame: string;
    handlePlan: (value: string) => void
}) => {

    let cards;
    if (plan) {
        cards = cardItems[timeFrame].map((item: PlanCardType) => (
            <div
                key={item.plan}
                className={`card ${plan === item.plan ? "active" : ""}`}
                onClick={() => handlePlan(item.plan)}
            >
                <img src={item.icon} alt="Plan icon"/>
                <div className="card__plan">
                    <h2 className="card__plan-name">{item.plan}</h2>
                    <p className="card__plan-price">${item.price}/{timeFrame === "monthly" ? "mo" : "yr"}</p>
                    {item.freeTrial && <p className="card__plan-free-trial">{item.freeTrial}</p>}
                </div>
            </div>
        ));
    }

    return (
        <div className="cards">
            {cards}
        </div>
    );
};

export default Cards;
