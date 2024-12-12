import {Questions} from "../types.ts";
import {vitest} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react";
import Quiz from "../src/components/Quiz/Quiz.component.tsx";

describe("Quiz component", () => {
    const mockQuestions: Questions[] = [
        {
            question: "What is the capital of France?",
            options: ["Paris", "London", "Berlin", "Madrid"],
            answer: "Paris"
        },
        {
            question: "What is the largest planet in our solar system?",
            options: ["Earth", "Mars", "Jupiter", "Saturn"],
            answer: "Jupiter"
        },
    ]
    const mockHasCompleted = vitest.fn()
    const mockSetScore = vitest.fn()

    beforeEach(() => {
        vitest.spyOn(Storage.prototype, "getItem").mockImplementation(() => null);
        vitest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
        });
        vitest.spyOn(Storage.prototype, "clear").mockImplementation(() => {
        });
    });

    test("should render quiz components", () => {
        render(<Quiz questions={mockQuestions} setHasCompleted={mockHasCompleted} setScore={mockSetScore}
                     score={0}/>)

        const currentQuestion = screen.getByText(mockQuestions[0].question)
        const submitButton = screen.getByRole("button", {name: /submit/i})

        mockQuestions[0].options.forEach(optionItem => {
            const option = screen.getByText(optionItem);
            expect(option).toBeInTheDocument()
        })
        expect(currentQuestion).toBeInTheDocument()
        expect(submitButton).toBeInTheDocument()
    })

    test("should display error message when trying to submit without selecting an answer", () => {
        render(<Quiz questions={mockQuestions} setHasCompleted={mockHasCompleted} setScore={mockSetScore}
                     score={0}/>)

        const submitButton = screen.getByRole("button", {name: /submit/i})
        fireEvent.click(submitButton)

        const errorMessage = screen.getByText("Please select an answer")
        expect(errorMessage).toBeInTheDocument()
    })

    test("should submit the correct answer and update the score", () => {
        render(<Quiz questions={mockQuestions} setHasCompleted={mockHasCompleted} setScore={mockSetScore}
                     score={0}/>)

        const selectedOption = screen.getByText("Paris")
        const submitButton = screen.getByRole("button", {name: /submit/i})

        fireEvent.click(selectedOption)
        fireEvent.click(submitButton)

        expect(mockSetScore).toHaveBeenCalledTimes(1)

        const nextButton = screen.getByRole("button", {name: /next/i})
        expect(nextButton).toBeInTheDocument()
    })

    test("should move to the next question after submitting", () => {
        render(<Quiz questions={mockQuestions} setHasCompleted={mockHasCompleted} setScore={mockSetScore}
                     score={0}/>)

        const selectedOption = screen.getByText("Paris")
        fireEvent.click(selectedOption)

        const submitButton = screen.getByRole("button", {name: /submit/i})
        fireEvent.click(submitButton)

        const nextButton = screen.getByRole("button", {name: /next/i})
        fireEvent.click(nextButton)

        const currentQuestion = screen.getByText(/What is the largest planet/i)

        expect(mockSetScore).toHaveBeenCalledTimes(2)
        expect(currentQuestion).toBeInTheDocument()
    })

    test("should mark quiz as completed after last question", () => {
        render(<Quiz questions={mockQuestions} setHasCompleted={mockHasCompleted} setScore={mockSetScore}
                     score={0}/>)

        const selectedOption = screen.getByText("Paris")
        fireEvent.click(selectedOption)

        const submitButton = screen.getByRole("button", {name: /submit/i})
        fireEvent.click(submitButton)

        const nextButton = screen.getByRole("button", {name: /next/i})
        fireEvent.click(nextButton)

        const currentQuestion = screen.getByText(/What is the largest planet/i)

        expect(mockSetScore).toHaveBeenCalledTimes(3)
        expect(currentQuestion).toBeInTheDocument()

        const newSelectedOption = screen.getByText("Jupiter")
        fireEvent.click(newSelectedOption)

        const newSubmitButton = screen.getByRole("button", {name: /submit/i})
        fireEvent.click(newSubmitButton)

        const completeButton = screen.getByRole("button", {name: /complete/i})
        fireEvent.click(completeButton)

        expect(mockSetScore).toHaveBeenCalledTimes(4)
        expect(mockHasCompleted).toHaveBeenCalledTimes(1)
    })

})