import IconComponent from "../Icon/Icon.component.tsx";
import MessageComponent from "../Message/Message.component.tsx";

import "./homepage.styles.css";
import {Topics} from "../../constants.ts";

const HomepageComponent = ({
                               getQuiz,
                           }: {
    getQuiz: (value: string) => void;
}) => {
    return (
        <div className="homepage">
            <MessageComponent
                title={"Welcome to the"}
                subtitle={"Frontend Quiz!"}
                message={"Pick a subject to get started."}
            />
            <div className="options">
                {Topics.map((topic) => (
                    <button
                        key={topic.label}
                        className={`options__item`}
                        onClick={() => getQuiz(topic.label)}
                    >
                        <IconComponent icon={topic.icon} customClassName={topic.label}/>{" "}
                        <h4>{topic.label}</h4>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default HomepageComponent;
