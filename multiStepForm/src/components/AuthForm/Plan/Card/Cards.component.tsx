import {
    PlanCardType,
    CardsType,
} from "../../../../types.ts";

import "./card.styles.css";
import {CardItems} from "../../../../constant.ts";

const Cards = ({plan, updateForm, timeFrame}: CardsType) => {
    const cards = CardItems.map((item: PlanCardType) => (
        <div
            key={item.title}
            className={`card ${plan?.title === item.title ? "active" : ""}`}
            onClick={() => updateForm(item)}
        >
            <img src={item.icon} alt="Plan icon"/>
            <div className="card__plan">
                <h2 className="card__plan-name">{item.title}</h2>
                <p className="card__plan-price">
                    $
                    {timeFrame === "monthly"
                        ? item.price + "/mo"
                        : item.price * 10 + "/yr"}
                </p>
                {timeFrame === "yearly" && (
                    <p className="card__plan-free-trial">2 months free</p>
                )}
            </div>
        </div>
    ));

    return <div className="cards">{cards}</div>;
};

export default Cards;
