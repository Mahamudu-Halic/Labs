import SelectedQuiz from "../Selected Quiz/SelectedQuiz.component.tsx";
import MessageComponent from "../Message/Message.component.tsx";


interface QuizCompletedProps {
    reset: () => void;
    score: number;
    totalQuestions: number;
    title: string;
    icon: string;
}


const QuizCompleted = ({title, icon, score, totalQuestions, reset}: QuizCompletedProps) => {
    
    /**
     * Resets the quiz state and clears relevant session storage data.
     *
     * It removes the following session storage items:
     * - score
     * - questionNumber
     * - hasCompleted
     * - quiz
     *
     * It also sets the quiz state to undefined.
     */
    
    return (
        <div className={"quiz-completed"}>
            <MessageComponent title={"Quiz Completed"} subtitle={"You scored..."} message={""}/>
            <div className="results-container">
                <div className={"score-container"}>
                    <SelectedQuiz title={title} icon={icon}/>
                    <h1 className="score">{score}</h1>
                    <p className="totalScore">out of {totalQuestions}</p>
                </div>
                <button className={"submit__btn reset__btn"} onClick={reset}>Play Again</button>
            </div>
        </div>
    )
}

export default QuizCompleted