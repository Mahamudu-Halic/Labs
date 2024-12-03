import ThemeToggler from "../ThemeToggler/ThemeToggler.component.tsx";
import SelectedQuiz from "../Selected Quiz/SelectedQuiz.component.tsx";

import "./header.styles.css"

interface HeaderProps {
    title?: string;
    icon?: string;
}

/**
 * A simple header component which renders a SelectedQuiz component if title and icon props are given
 * and a ThemeToggler component
 *
 * @param {{title?: string, icon?: string}} props
 * @prop {string} title - The title of the quiz
 * @prop {string} icon - The icon of the quiz
 *
 * @example
 * <HeaderComponent title="HTML" icon={htmlSvg} />
 */
const HeaderComponent = ({title, icon}: HeaderProps) => {
    return (
        <header className={"header"}>
            {title && icon && <SelectedQuiz title={title} icon={icon}/>}
            <ThemeToggler/>
        </header>
    )
}

export default HeaderComponent 