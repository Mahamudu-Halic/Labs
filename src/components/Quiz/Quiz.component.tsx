import { useEffect, useState } from "react";

import Options from "./Options.component.tsx";
import Question from "./Question.component.tsx";

import { Questions } from "../../../types.ts";

import errorIconSvg from "/assets/images/icon-error.svg";

import "./quiz.styles.css";

interface QuizProps {
  questions: Questions[];
  setHasCompleted: (value: boolean) => void;
  setScore: (value: number) => void;
  score: number;
}

/**
 * Quiz component renders a quiz interface that allows users to answer questions
 * and navigate through them. It manages the state of the current question, selected
 * answer, score, and completion status.
 *
 * @param {Questions[]} questions - Array of question objects containing the question text, options, and correct answer.
 * @param {function} setHasCompleted - Callback function to update the completion status of the quiz.
 * @param {function} setScore - Callback function to update the user's score.
 * @param {number} score - The current score of the user.
 *
 * @returns {JSX.Element} A component rendering the current question, options to select, and control buttons for submission and navigation.
 */
const Quiz = ({ questions, setHasCompleted, setScore, score }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [options, setOptions] = useState<string[] | undefined>(undefined);
  const [questionNumber, setQuestionNumber] = useState<number>(
    () => Number(sessionStorage.getItem("questionNumber")) || 0
  );
  const [answer, setAnswer] = useState<string>("");

  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false);

  /**
   * Increments the questionNumber state by 1 if the user has not reached the
   * last question. If the user has reached the last question, it logs "complete"
   * to the console and does not increment the state.
   */
  const handleNextQuestion = () => (questionNumber === questions.length - 1) ? handleCompleted() : setQuestionNumber(questionNumber + 1)

  /**
   * Handles the submission of an answer. If the user has not selected an answer,
   * it displays an error message. If the user has selected an answer, it checks
   * if the answer is correct. If the answer is correct, it increments the user's
   * score and updates the score in local storage. It then increments the
   * questionNumber state by 1 if the user has not reached the last question. If
   * the user has reached the last question, it sets the hasCompleted state to true
   * in local storage.
   */
  const handleSubmit = () => {
    if (!selectedAnswer) return setShowError(true);

    setAnswer(questions[questionNumber].answer);

    if (selectedAnswer === questions[questionNumber].answer) {
      sessionStorage.setItem("score", String(score + 1));
      setScore(score + 1);
    }

    return questionNumber < questions.length - 1
      ? sessionStorage.setItem("questionNumber", String(questionNumber + 1))
      : sessionStorage.setItem("hasCompleted", "true");
  };

/**
 * Sets the completion status of the quiz to true, indicating that the
 * user has completed all the questions in the quiz.
 */
  const handleCompleted = () => setHasCompleted(true);

  /**
   * Resets the error state to false and updates the selectedAnswer state to
   * the given value.
   *
   * @param {string} value - The value to be set as the selected answer.
   */
  const handleSelection = (value: string) => {
    setShowError(false);
    setSelectedAnswer(value);
  };

  /**
   * Updates the current question and options based on the current questionNumber.
   */
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
          onClick={
            answer
              ? questionNumber === questions.length - 1
                ? handleCompleted
                : handleNextQuestion
              : handleSubmit
          }
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

export default Quiz;
