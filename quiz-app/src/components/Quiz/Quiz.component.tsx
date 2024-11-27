import { useEffect, useState } from "react";

import Options from "../Options/Options.component.tsx";
import Question from "../Question/Question.component.tsx";

import { Data } from "../../../types.ts";

import errorIconSvg from "/assets/images/icon-error.svg";

import "./quiz.styles.css";


const QuizComponent = ({ quiz }: { quiz: Data }) => {
  const { questions } = quiz;

  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [options, setOptions] = useState<string[] | undefined>(undefined);
  const [questionNumber, setQuestionNumber] = useState<number>(
    () => Number(sessionStorage.getItem("questionNumber")) || 0
  );
  const [answer, setAnswer] = useState<string>("");

  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);

  const [score, setScore] = useState<number>(
    () => Number(sessionStorage.getItem("score")) || 0
  );

  const handleNextQuestion = () => {
    if (questionNumber === questions.length - 1) {
      // Display final score or show results
      console.log("complete");
      return;
    }
    setQuestionNumber(questionNumber + 1);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) {
      return setShowError(true);
    }

    setAnswer(questions[questionNumber].answer);

    if (selectedAnswer === questions[questionNumber].answer) {
      setScore((prev) => (prev += 1));
      sessionStorage.setItem("score", String(score + 1));
    }

    questionNumber < questions.length - 1 &&
      sessionStorage.setItem("questionNumber", String(questionNumber + 1));
  };

  const handleSelection = (value: string) => {
    setShowError(false);
    setSelectedAnswer(value);
  };

  useEffect(() => {
    setCurrentQuestion(questions[questionNumber].question);
    setOptions(questions[questionNumber].options);
    setAnswer("");
    setSelectedAnswer("");
  }, [questionNumber]);

  return (
    <div className={"quiz"}>
      <Question
        questionNumber={questionNumber}
        totalQuestions={questions.length}
        currentQuestion={currentQuestion}
      />

      <div className={"options-container"}>
        <Options
          answer={answer}
          selectedAnswer={selectedAnswer}
          options={options}
          handleSelection={handleSelection}
        />
        <button
          className={"submit__btn"}
          onClick={answer ? handleNextQuestion : handleSubmit}
        >
          {answer
            ? questionNumber === questions.length - 1
              ? "Complete"
              : "Next question"
            : "Submit answer"}
        </button>
        {!selectedAnswer && showError && (
          <p className="error-message">
            <img src={errorIconSvg} alt={"error icon"} /> Please select an
            answer
          </p>
        )}
      </div>
    </div>
  );
};

export default QuizComponent;
