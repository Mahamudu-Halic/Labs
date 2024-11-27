import ThemeToggler from "../ThemeToggler/ThemeToggler.component.tsx";
import SelectedQuiz from "../Selected Quiz/SelectedQuiz.component.tsx";

import "./header.styles.css"

const HeaderComponent = ({title, icon}: { title?: string, icon?: string }) => {
    return (
        <header className={"header"}>
            {title && icon && <SelectedQuiz title={title} icon={icon}/>}
            <ThemeToggler/>
        </header>
    )
}

export default HeaderComponent 