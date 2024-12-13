import { fireEvent, render, screen } from "@testing-library/react";
import { vitest } from "vitest";
import Options from "../src/components/Quiz/Options.component";

describe("Options component", () => {
  const mockOptions = ["1", "2", "3", "4"];
  const mockAnswer = "1";
  const mockHandleSelection = vitest.fn();
  test("should render options component", () => {
    render(
      <Options
        options={mockOptions}
        handleSelection={mockHandleSelection}
        answer={""}
        selectedAnswer=""
      />
    );

    mockOptions.forEach((optionItem) => {
      const option = screen.getByText(optionItem);
      expect(option).toBeInTheDocument();
    });
  });

  test("should select option when clicked", () => {
    render(
      <Options
        options={mockOptions}
        handleSelection={mockHandleSelection}
        answer={""}
        selectedAnswer=""
      />
    );

    const option = screen.getByText("3");
    fireEvent.click(option);

    expect(mockHandleSelection).toHaveBeenCalledWith(option.textContent);
    expect(mockHandleSelection).toHaveBeenCalledTimes(1);
  });

  test("should render wrong icon if selected option is not equal to answer", () => {
    render(
      <Options
        answer={mockAnswer}
        handleSelection={mockHandleSelection}
        selectedAnswer="3"
        options={mockOptions}
      />
    );

    const wrongIcon = screen.getByRole("img", { name: /incorrect/i });
    expect(wrongIcon).toBeInTheDocument();
  });

  test("should render correct icon if selected option is equal to answer", () => {
    render(
      <Options
        options={mockOptions}
        handleSelection={mockHandleSelection}
        selectedAnswer="1"
        answer={mockAnswer}
      />
    );

    const correctIcon = screen.getByRole("img", { name: /correct/i });
    expect(correctIcon).toBeInTheDocument();
  });

  test("should disable button when anwer is provided (not the selected answer)", () => {
    render(
      <Options
        options={mockOptions}
        handleSelection={mockHandleSelection}
        selectedAnswer="1"
        answer={mockAnswer}
      />
    );

    const optionBtns = screen.getAllByRole("button");

    optionBtns.forEach((button) => {
      expect(button).toBeDisabled();
    });
  });
});
