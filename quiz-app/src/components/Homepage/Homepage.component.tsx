
import IconComponent from "../Icon/Icon.component.tsx";
import MessageComponent from "../Message/Message.component.tsx";

import "./homepage.styles.css";
import { Topics } from "../../constants.ts";

/**
 * HomepageComponent is the main component for the homepage of the Frontend Quiz application.
 *
 * It displays a message with a title, subtitle, and message. The message component is reusable.
 * Below the message component, it displays a list of topics as buttons. Each button has an icon and the topic label.
 * When a button is clicked, it calls the getQuiz function with the topic label and the callback setQuiz.
 *
 * The component expects a single prop, setQuiz, which is a callback function that takes a Data object as an argument.
 * The callback function is used to set the quiz state in the App component.
 *
 * @example
 * <HomepageComponent setQuiz={(value) => console.log(value)} />
 */
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
            <IconComponent icon={topic.icon} customClassName={topic.label} />{" "}
            <h4>{topic.label}</h4>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomepageComponent;
