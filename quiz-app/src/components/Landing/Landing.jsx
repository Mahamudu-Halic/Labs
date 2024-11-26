import ThemeToggler from "../ThemeToggler/ThemeToggler";
import jsSvg from "/assets/icon-js.svg";
import htmlSvg from "/assets/icon-html.svg";
import cssSvg from "/assets/icon-css.svg";
import accessibilitySvg from "/assets/icon-accessibility.svg";

import "./landing.css";
import { useState } from "react";
import fetchApi from "../../utils/fetchApi";

function LandingPage() {

  return (
    <div className="landing__page">
      <header>
        <p></p>
        <ThemeToggler />
      </header>

      <main>
        <p className="welcome__message">Welcome to our quiz app!</p>
        <div className="options">
          <button
            className="options__item"
            onClick={() => fetchApi("Javascript")}
          >
            <img src={jsSvg} alt="" /> Javascript
          </button>
          <button className="options__item">
            <img src={htmlSvg} alt="" /> HTML
          </button>
          <button className="options__item">
            <img src={cssSvg} alt="" /> CSS
          </button>
          <button className="options__item">
            <img src={accessibilitySvg} alt="" /> Accessibility
          </button>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
