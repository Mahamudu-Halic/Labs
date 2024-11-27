import IconComponent from "../Icon/Icon.component.tsx";

import "./selected-quiz.styles.css"

const SelectedQuiz = ({title, icon}: { title: string, icon: string }) => {
    return (
        <div className={"selected__icon-container"}>
            <IconComponent icon={icon} customClassName={title}/>
            <p className={"selected__icon-title"}>{title}</p>
        </div>
    )
}

export default SelectedQuiz