import {Data} from "../../../types.ts";

import "./quiz.styles.css"
import {useEffect, useState} from "react";

type Question = {
    question: string;
    options: string[];
    answer: string;
}

const OptionChars = ["A", "B", "C", "D"]

const QuizComponent = ({quiz}: { quiz: Data }) => {
    const {questions} = quiz

    const [currentQuestion, setCurrentQuestion] = useState<string>("")
    const [options, setOptions] = useState<string[] | undefined>(undefined)
    const [questionNumber, setQuestionNumber] = useState<number>(0)
    const [answer, setAnswer] = useState<string>("")
    const [selectedAnswer, setSelectedAnswer] = useState<string>("")
    const [score, setScore] = useState<number>(0)

    const handleNextQuestion = () => {
        if (questionNumber === questions.length - 1) {
            // Display final score or show results
            console.log("complete")
            return;
        }
        setQuestionNumber(questionNumber + 1)
    }

    const handleSubmit = () => {
        if (selectedAnswer === answer) {
            setScore(prev => prev += 1)
        }
    }

    const handleSelection = (value: string) => {
        setSelectedAnswer(value)
    }


    useEffect(() => {
        setCurrentQuestion(questions[questionNumber].question)
        setOptions(questions[questionNumber].options)
        setAnswer(questions[questionNumber].answer)
        setSelectedAnswer("")
    }, [questionNumber])

    return (
        <div className={"quiz"}>
            <div className={"question-container"}>
                <p className="question__number">Question {questionNumber + 1} of {questions.length}</p>
                <h2 className={"question"}>{currentQuestion}</h2>
                <input type="range" className={"question__progress_bar"}/>
            </div>

            <div className={"options-container"}>
                <div className={"options"}>
                    {
                        options && options.map((option, index) => (
                            <button key={option} className={"options__item"} onClick={() => handleSelection(option)}>
                                <div className={"option__char"}><p>{OptionChars[index]}</p></div>
                                {option}
                            </button>
                        ))
                    }
                </div>
                <button className={"submit__btn"} onClick={handleSubmit}>Submit answer</button>
            </div>
        </div>
    )
}

export default QuizComponent;