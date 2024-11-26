import ThemeToggler from "../ThemeToggler/ThemeToggler.component.tsx";
import IconComponent from "../Icon/Icon.component.tsx";

import {Data} from "../../../types.ts";

import "./header.styles.css"

const HeaderComponent = ({quiz}: { quiz?: Data | undefined }) => {
    return (
        <header className={"header"}>
            {
                quiz && (
                    <div className={"header__icon-container"}>
                        <IconComponent icon={quiz?.icon} customClassName={quiz?.title}/>
                        <p className={"header__icon-title"}>{quiz?.title}</p>
                    </div>
                )
            }
            <ThemeToggler/>
        </header>
    )
}

export default HeaderComponent