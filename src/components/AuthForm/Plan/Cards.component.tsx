import React from "react";

const cardItems = {
  monthly: [
    {
      icon: "./assets/images/icon-arcade.svg",
      plan: "Arcade",
      price: 9,
    },
    {
      icon: "./assets/images/icon-advanced.svg",
      plan: "Advanced",
      price: 12,
    },
    {
      icon: "./assets/images/icon-pro.svg",
      plan: "Pro",
      price: 15,
    },
  ],

  yearly: [
    {
      icon: "./assets/images/icon-arcade.svg",
      plan: "Arcade",
      price: 90,
      freeTrial: "2 months free",
    },
    {
      icon: "./assets/images/icon-advanced.svg",
      plan: "Advanced",
      price: 120,
      freeTrial: "2 months free",
    },
    {
      icon: "./assets/images/icon-pro.svg",
      plan: "Pro",
      price: 150,
      freeTrial: "2 months free",
    },
  ],
};
const Cards = () => {
  return (
    <div className="cards">
      <input type="checkbox" name="" id="something" />
      <label htmlFor="something" className="card active">
        <img src="./assets/images/icon-arcade.svg" alt="image" />
        <div className="card__plan">
          <h2 className="card__plan-name">Arcade</h2>
          <p className="card__plan-price">$9/mo</p>
          <p className="card__plan-free-trial">2 months free</p>
        </div>
      </label>
    </div>
  );
};

export default Cards;
