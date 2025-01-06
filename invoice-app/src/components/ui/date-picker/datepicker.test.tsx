import { render, screen, fireEvent } from "@testing-library/react";
import DatePicker from "./DatePicker";
import { describe, expect, test, vi } from "vitest";

describe("DatePicker Component", () => {
  const mockHandleSelection = vi.fn();
  const initialDate = "2025-01-06";

  test("renders DatePicker correctly", () => {
    render(
      <DatePicker
        selectedDate={initialDate}
        handleSelection={mockHandleSelection}
      />,
    );

    expect(screen.getByText("Jan 2025")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /left arrow icon/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /right arrow icon/i }),
    ).toBeInTheDocument();

    expect(screen.getAllByRole("button", { name: /\d+/ })).toHaveLength(35);
  });

  test("handles navigation to the previous and next months", () => {
    render(
      <DatePicker
        selectedDate={initialDate}
        handleSelection={mockHandleSelection}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /left arrow icon/i }));
    expect(screen.getByText("Dec 2024")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /right arrow icon/i }));
    expect(screen.getByText("Jan 2025")).toBeInTheDocument();
  });

  test("calls handleSelection when a date is selected", () => {
    render(
      <DatePicker
        selectedDate={initialDate}
        handleSelection={mockHandleSelection}
      />,
    );

    const dateButton = screen.getByRole("button", { name: "15" });
    fireEvent.click(dateButton);

    expect(mockHandleSelection).toHaveBeenCalledWith(
      "2025-01-15",
      "datepicker",
    );
  });

  test("disables days not in the current month", () => {
    render(
      <DatePicker
        selectedDate={initialDate}
        handleSelection={mockHandleSelection}
      />,
    );

    const disabledButton = screen
      .getAllByRole("button")
      .find((btn) => btn.hasAttribute("disabled"));
    expect(disabledButton).toBeInTheDocument();
  });

  test("highlights the selected date", () => {
    render(
      <DatePicker
        selectedDate={initialDate}
        handleSelection={mockHandleSelection}
      />,
    );

    const activeDate = screen.getByRole("button", { name: "6" });
    expect(activeDate).toHaveClass("active");
  });
});
