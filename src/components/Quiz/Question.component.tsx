const Question = ({
                      currentQuestion,
                      questionNumber,
                      totalQuestions,
                  }: {
    currentQuestion: string;
    questionNumber: number;
    totalQuestions: number;
}) => {
    const percentage = ((questionNumber + 1) / totalQuestions) * 100;
    return (
        <div className={"question-container"}>
            <p className="question__number">
                Question {questionNumber + 1} of {totalQuestions}
            </p>
            <h3 className={"question"}>{currentQuestion}</h3>
            <div className="question__progress_bar-container">
                <div className={`question__progress_bar`} style={{width: percentage + "%"}}/>
            </div>
        </div>
    );
};

export default Question;
