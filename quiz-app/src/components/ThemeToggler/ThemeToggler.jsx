import {useEffect, useState} from "react";

import "./themetoggler.css"

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
        <div className="theme">

            <label htmlFor="theme__toggle" className={"theme__toggle"}>
                <input type="checkbox" id={"theme__toggle"} checked={theme === "dark"} onChange={toggleTheme}/>
                <span className={"theme__toggle-slider"}></span>
            </label>
            
        </div>
    )
}

export default ThemeToggler;