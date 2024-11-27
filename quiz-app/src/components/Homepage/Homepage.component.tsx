import fetchData from "../../utils/fetchData.ts";

import IconComponent from "../Icon/Icon.component.tsx";

import {Data, DataResponse} from "../../../types.ts";

import jsSvg from "/assets/images/icon-js.svg";
import htmlSvg from "/assets/images/icon-html.svg";
import cssSvg from "/assets/images/icon-css.svg";
import accessibilitySvg from "/assets/images/icon-accessibility.svg";


import "./homepage.styles.css"

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
    }
]

const HomepageComponent = ({setQuiz}: { setQuiz: (value: Data | undefined) => void; }) => {

    const getQuiz = (value: string) => {

        const response: DataResponse = fetchData(value)
        console.log(response)

        if (response.status === "failed") {
            console.log(response?.message)
            return
        }
        sessionStorage.setItem("quiz", JSON.stringify(response.data))
        return response.status === "success" && response?.data && setQuiz(response.data)
    }
    return (
        <div className="homepage">
            <main>
                <section className="welcome__message-container">
                    <h2 className="welcome__message-title">Welcome to the <span>Frontend Quiz!</span></h2>
                    <p className="welcome__message">Pick a subject to get started.</p>
                </section>
                <div className="options">
                    {
                        Topics.map((topic) => (
                            <button
                                key={topic.label}
                                className={`options__item`}
                                onClick={() => getQuiz(topic.label)}
                            >
                                <IconComponent icon={topic.icon} customClassName={topic.label}/> {topic.label}
                            </button>
                        ))
                    }
                </div>
            </main>
        </div>
    )
}

export default HomepageComponent;