import correctIconSvg from "/assets/images/icon-correct.svg";
import incorrectIconSvg from "/assets/images/icon-incorrect.svg";

import "./options.styles.css";

interface OptionsProps {
  options: string[] | undefined;
  answer: string;
  selectedAnswer: string;
  handleSelection: (value: string) => void;
}

/**
 * Options component. Displays a list of options for the user to select,
 * with the correct/incorrect status displayed if the answer is known.
 *
 * @param {string} answer - The correct answer.
 * @param {string} selectedAnswer - The user's selected answer.
 * @param {function(string)} handleSelection - The function to be called when the user selects an answer.
 * @param {string[]} options - The list of options to display.
 */
const Options = ({
  answer,
  selectedAnswer,
  handleSelection,
  options,
}: OptionsProps) => {
  const OptionChars = ["A", "B", "C", "D"];

  const optionsList =
    options &&
    options.map((option, index) => (
      <button
        key={option}
        disabled={!!answer}
        className={`options__item ${
          answer
            ? answer === option
              ? answer === selectedAnswer
                ? "correct"
                : ""
              : selectedAnswer === option
              ? "incorrect"
              : ""
            : selectedAnswer === option
            ? "selected"
            : ""
        }`}
        onClick={() => handleSelection(option)}
      >
        <div className={"option__char"}>
          <span>{OptionChars[index]}</span>
        </div>
        <h4>{option}</h4>
        {answer && answer === option && (
          <img className="answer-icon" src={correctIconSvg} alt={"correct"} />
        )}
        {answer && selectedAnswer === option && answer !== option && (
          <img
            className="answer-icon"
            src={incorrectIconSvg}
            alt={"incorrect"}
          />
        )}
      </button>
    ));

  return <div className="options">{optionsList}</div>;
};

export default Options;
