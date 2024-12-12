import {render, screen} from "@testing-library/react";
import MessageComponent from "../src/components/Message/Message.component.tsx";

describe("Message component", () => {
    it("should render message, title and subtitle", () => {
        render(<MessageComponent title={"frontend"} message={"pick a topic"} subtitle={"welcome to frontend quiz"}/>)

        const title = screen.getByText("frontend")
        const subtitle = screen.getByText(/welcome to frontend/i)
        const message = screen.getByText(/pick a topic/i)

        expect(title).toBeInTheDocument()
        expect(subtitle).toBeInTheDocument()
        expect(message).toBeInTheDocument()
    })

    it("should render title", () => {
        render(<MessageComponent title={"frontend"}/>)

        const title = screen.getByText("frontend")
        const subtitle = screen.queryByText("some text");
        const message = screen.queryByText("some text");

        expect(title).toBeInTheDocument()
        expect(subtitle).not.toBeInTheDocument()
        expect(message).not.toBeInTheDocument()
    })

    it("should render subtitle", () => {
        render(<MessageComponent subtitle={"welcome to frontend quiz"}/>)

        const title = screen.queryByText("frontend");
        const subtitle = screen.getByText(/welcome to frontend/i);
        const message = screen.queryByText("some text");

        expect(title).not.toBeInTheDocument()
        expect(subtitle).toBeInTheDocument()
        expect(message).not.toBeInTheDocument()
    })

    it("should render message", () => {
        render(<MessageComponent message={"pick a topic"}/>)

        const title = screen.queryByText("frontend");
        const subtitle = screen.queryByText("welcome to frontend quiz");
        const message = screen.getByText(/pick a topic/i);

        expect(title).not.toBeInTheDocument()
        expect(subtitle).not.toBeInTheDocument()
        expect(message).toBeInTheDocument()
    })

    it("should not render title, subtitle and message", () => {
        render(<MessageComponent/>)

        const title = screen.queryByText("frontend");
        const subtitle = screen.queryByText("welcome to frontend quiz");
        const message = screen.queryByText("pick a topic");

        expect(title).not.toBeInTheDocument()
        expect(subtitle).not.toBeInTheDocument()
        expect(message).not.toBeInTheDocument()
    })
})