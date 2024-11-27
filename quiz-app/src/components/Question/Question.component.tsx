const Question = ({
  currentQuestion,
  questionNumber,
  totalQuestions,
}: {
  currentQuestion: string;
  questionNumber: number;
  totalQuestions: number;
}) => {
  return (
    <div className={"question-container"}>
      <p className="question__number">
        Question {questionNumber + 1} of {totalQuestions}
      </p>
      <h2 className={"question"}>{currentQuestion}</h2>
      <input
        type="range"
        className={"question__progress_bar"}
        max={totalQuestions}
        value={questionNumber + 1}
        min={1}
      />
    </div>
  );
};

export default Question;
