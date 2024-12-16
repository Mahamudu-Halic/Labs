import { fireEvent, render, screen } from "@testing-library/react";
import ThemeToggler from "../src/components/Header/ThemeToggler/ThemeToggler.component.tsx";

describe("ThemeToggler component", () => {
  test("should render theme toggler components", () => {
    render(<ThemeToggler />);
    const toggleInput = screen.getByRole("checkbox");
    const slider = screen.getByLabelText(/slider/i);
    const sunIcon = screen.getByRole("img", { name: /sun image/i });
    const moonIcon = screen.getByRole("img", { name: /moon image/i });

    expect(toggleInput).toBeInTheDocument();
    expect(slider).toBeInTheDocument();
    expect(sunIcon).toBeInTheDocument();
    expect(moonIcon).toBeInTheDocument();
    expect(toggleInput).not.toBeChecked();
  });

  test("should toggle theme on click", () => {
    render(<ThemeToggler />);
    const toggleInput = screen.getByRole("checkbox");
    fireEvent.click(toggleInput);
    expect(toggleInput).toBeChecked();
  });

  test("should be toggled", () => {
    render(<ThemeToggler />);

    const toggleInput = screen.getByRole("checkbox");
    expect(toggleInput).toBeChecked();
  });
});
