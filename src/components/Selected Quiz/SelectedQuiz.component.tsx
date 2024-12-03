import IconComponent from "../Icon/Icon.component.tsx";

import "./selected-quiz.styles.css"

/**
 * SelectedQuiz is a component that renders an icon and title for a selected quiz.
 *
 * @param {object} props - The props object.
 * @param {string} props.title - The title of the quiz.
 * @param {string} props.icon - The URL of the icon for the quiz.
 *
 * @returns {JSX.Element} A styled div containing the icon and title of the quiz.
 */
const SelectedQuiz = ({title, icon}: { title: string, icon: string }) => {
    return (
        <div className={"selected__icon-container"}>
            <IconComponent icon={icon} customClassName={title}/>
            <h4 className={"selected__icon-title"}>{title}</h4>
        </div>
    )
}

export default SelectedQuiz