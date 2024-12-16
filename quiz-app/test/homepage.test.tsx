import {render, screen} from "@testing-library/react";
import {Topics} from "../src/constants.ts";
import HomepageComponent from "../src/components/Homepage/Homepage.component.tsx";
import {vitest} from "vitest";

describe("homepage component", () => {
    const getQuiz = vitest.fn()

    it("should render homepage components", () => {
        render(<HomepageComponent getQuiz={getQuiz}/>);

        const title = screen.getByText(/welcome/i);
        const subtitle = screen.getByText(/Frontend/i);
        const message = screen.getByText(/pick a subject/i);
        const topics = screen.getAllByRole("button");

        expect(title).toBeInTheDocument();
        expect(subtitle).toBeInTheDocument();
        expect(message).toBeInTheDocument();
        expect(topics).toHaveLength(Topics.length);
    });

    it("should render topic buttons correctly", () => {
        render(<HomepageComponent getQuiz={getQuiz}/>);

        Topics.forEach((topic) => {
            const button = screen.getByText(topic.label);
            expect(button).toBeInTheDocument();
        });
    });

    it("should render topic icons correctly", () => {
        render(<HomepageComponent getQuiz={getQuiz}/>);

        Topics.forEach((topic) => {
            const icon = screen.getByRole("img", {name: topic.icon});
            expect(icon).toBeInTheDocument();
        });
    });

    it("should call getQuiz when a button is clicked", () => {
        render(<HomepageComponent getQuiz={getQuiz}/>);

        Topics.forEach((topic, i) => {
            const button = screen.getByText(topic.label);
            button.click();
            expect(getQuiz).toHaveBeenCalledWith(topic.label);
            expect(getQuiz).toHaveBeenCalledTimes(i + 1);
        });
    });
});
