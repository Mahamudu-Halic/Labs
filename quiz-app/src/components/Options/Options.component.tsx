import correctIconSvg from "/assets/images/icon-correct.svg";
import incorrectIconSvg from "/assets/images/icon-incorrect.svg";

const Options = ({
  answer,
  selectedAnswer,
  handleSelection,
  options,
}: {
  options: string[] | undefined;
  answer: string;
  selectedAnswer: string;
  handleSelection: (value: string) => void;
}) => {
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
          <p>{OptionChars[index]}</p>
        </div>
        {option}
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

// answer && answer === option ? answer === selectedAnswer ? "correct" : "" : selectedAnswer === option ? "incorrect" : ""
