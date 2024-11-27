import IconComponent from "../Icon/Icon.component.tsx";

import {Data} from "../../../types.ts";

import jsSvg from "/assets/images/icon-js.svg";
import htmlSvg from "/assets/images/icon-html.svg";
import cssSvg from "/assets/images/icon-css.svg";
import accessibilitySvg from "/assets/images/icon-accessibility.svg";

import "./homepage.styles.css";
import getQuiz from "../../utils/getQuiz.ts";
import MessageComponent from "../Message/Message.component.tsx";

const Topics = [
    {
        label: "HTML",
        icon: htmlSvg,
    },
    {
        label: "CSS",
        icon: cssSvg,
    },
    {
        label: "JavaScript",
        icon: jsSvg,
    },
    {
        label: "Accessibility",
        icon: accessibilitySvg,
    },
];

const HomepageComponent = ({setQuiz}: { setQuiz: (value: Data) => void }) => {
    return (
        <div className="homepage">
            <main>
                <MessageComponent title={"Welcome to the"} subtitle={"Frontend Quiz!"}
                                  message={"Pick a subject to get started."}/>
                <div className="options">
                    {Topics.map((topic) => (
                        <button
                            key={topic.label}
                            className={`options__item`}
                            onClick={() => getQuiz({value: topic.label, callback: setQuiz})}
                        >
                            <IconComponent icon={topic.icon} customClassName={topic.label}/>{" "}
                            {topic.label}
                        </button>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default HomepageComponent;
