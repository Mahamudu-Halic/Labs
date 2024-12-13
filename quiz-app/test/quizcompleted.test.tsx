import { fireEvent, render, screen } from "@testing-library/react";
import QuizCompleted from "../src/components/Quiz/QuizCompleted.component";
import { vitest } from "vitest";

describe("Quiz Completed component", () => {
  const mockReset = vitest.fn();
  it("should render the quiz completed component", () => {
    render(
      <QuizCompleted
        icon={"html"}
        title={"html"}
        score={1}
        totalQuestions={1}
        reset={mockReset}
      />
    );

    const title = screen.getByText(/html/i);
    const icon = screen.getByRole("img", { name: /html/i });
    const score = screen.getByText(1);
    const totalQuestions = screen.getByText(/out of 1/i);
    const reset = screen.getByRole("button", { name: /play again/i });

    expect(title).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(score).toBeInTheDocument();
    expect(totalQuestions).toBeInTheDocument();
    expect(reset).toBeInTheDocument();
  });

  test("should reset the quiz when reset button is clicked", () => {
    render(
      <QuizCompleted
        icon={"html"}
        title={"html"}
        score={1}
        totalQuestions={1}
        reset={mockReset}
      />
    );

    const reset = screen.getByRole("button", { name: /play again/i });
    fireEvent.click(reset);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});
