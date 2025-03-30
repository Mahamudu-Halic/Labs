import {useState} from "react";


import {Data} from "../../../types.ts";


import "./quiz.styles.css";
import Quiz from "./Quiz.component.tsx";
import QuizCompleted from "./QuizCompleted.component.tsx";

interface QuizContainerProps {
    quiz: Data;
    reset: () => void;
}

const QuizContainer = ({quiz, reset}: QuizContainerProps) => {
    const {questions} = quiz;


    const [hasCompleted, setHasCompleted] = useState<boolean>(() => sessionStorage.getItem("hasCompleted") === "true");
    const [score, setScore] = useState<number>(
        () => Number(sessionStorage.getItem("score")) || 0
    );

    return (
        !hasCompleted ?
            <Quiz questions={questions} score={score} setHasCompleted={setHasCompleted} setScore={setScore}/>
            : <QuizCompleted title={quiz?.title || ""} icon={quiz?.icon || ""} reset={reset} score={score}
                             totalQuestions={questions.length}/>
    );
};

export default QuizContainer;
