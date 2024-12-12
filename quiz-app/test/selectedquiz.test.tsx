import {render, screen} from "@testing-library/react";
import SelectedQuiz from "../src/components/Selected Quiz/SelectedQuiz.component.tsx";

describe("Selected Quiz component", () => {
    it("should render the selected quiz componentts", () => {
        render(<SelectedQuiz title={"html"} icon={"html"}/>)

        const selectedQuiz = screen.getByText(/html/i);
        const icon = screen.getByRole("img", {name: /html/i});

        expect(selectedQuiz).toBeInTheDocument();
        expect(icon).toBeInTheDocument();
    })
})