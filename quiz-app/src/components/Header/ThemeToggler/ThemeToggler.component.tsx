import {useEffect, useState} from "react";

import sunLightSvg from "/assets/images/icon-sun-light.svg";
import sunDarkSvg from "/assets/images/icon-sun-dark.svg";
import moonLightSvg from "/assets/images/icon-moon-light.svg";
import moonDarkSvg from "/assets/images/icon-moon-dark.svg";

import "./theme-toggler.styles.css"

function ThemeToggler() {
    const [theme, setTheme] = useState(() => sessionStorage.getItem("theme") || "light");

    useEffect(() => {
        document.body.className = theme;
        sessionStorage.setItem("theme", theme);
    }, [theme])


    function toggleTheme() {
        setTheme(prev => prev === "light" ? "dark" : "light");  // Switch between light and dark themes on button click.
    }

    return (
        <div className="theme" aria-label={"theme"}>
            <img className="theme__icon" src={theme === "dark" ? sunLightSvg : sunDarkSvg}
                 alt="sun image icon"/>
            <label htmlFor="theme__toggle" className={"theme__toggle"}>
                <input type="checkbox" id={"theme__toggle"} checked={theme === "dark"} onChange={toggleTheme}/>
                <span className={"theme__toggle-slider"} aria-label={"slider"}></span>
            </label>
            <img className="theme__icon" src={theme === "dark" ? moonLightSvg : moonDarkSvg}
                 alt="moon image icon"/>
        </div>
    )
}

export default ThemeToggler;