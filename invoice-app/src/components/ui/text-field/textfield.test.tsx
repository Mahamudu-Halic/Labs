import { render, screen } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import userEvent from "@testing-library/user-event";
import TextField from "./TextField";
import { describe, expect, test } from "vitest";
import { ReactNode } from "react";

describe("TextField Component", () => {
  const renderWithFormProvider = (props = {}) => {
    const Wrapper = ({ children }: { children: ReactNode }) => {
      const form = useForm();
      return <FormProvider {...form}>{children}</FormProvider>;
    };

    return render(
      <Wrapper>
        <TextField type="text" id="test-input" name="testField" {...props} />
      </Wrapper>,
    );
  };

  test("renders the TextField component", () => {
    renderWithFormProvider();

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();

    expect(input).toHaveAttribute("id", "test-input");

    expect(input).toHaveClass("text-field");
  });

  test("accepts additional className", () => {
    renderWithFormProvider({ className: "custom-class" });

    const input = screen.getByRole("textbox");
    expect(input).toHaveClass("text-field custom-class");
  });

  test("applies the correct type attribute", () => {
    renderWithFormProvider({ type: "email" });

    const input = screen.getByRole("textbox");
    expect(input).toHaveAttribute("type", "email");
  });

  test("integrates with react-hook-form and validation rules", async () => {
    const user = userEvent.setup();
    const validationRules = { required: "This field is required" };

    renderWithFormProvider({ validationRules });

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();

    await user.type(input, "Hello World");
    expect(input).toHaveValue("Hello World");
  });

  test("registers its expected field from name and ID correctly", async () => {
    const user = userEvent.setup();
    const validationRules = { required: "This field is required" };

    renderWithFormProvider({ validationRules });

    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();

    await user.type(input, "test value");
    expect(input).toHaveValue("test value");

    expect(input).toHaveAttribute("name", "testField");
  });
});
