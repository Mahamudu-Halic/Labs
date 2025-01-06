import { describe, test, expect } from "vitest";
import DateTerms from "./DateTerms.tsx";
import { render, screen, fireEvent } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";
import userEvent from "@testing-library/user-event";
import { ReactNode } from "react";

describe("DateTerms Component", () => {
  const renderwithProviders = () => {
    const Wrapper = ({ children }: { children: ReactNode }) => {
      const form = useForm({
        defaultValues: {
          createdAt: "2023-01-06",
          paymentTerms: 30,
        },
        mode: "onTouched",
      });
      return <FormProvider {...form}>{children}</FormProvider>;
    };

    return render(
      <Wrapper>
        <DateTerms />
      </Wrapper>,
    );
  };

  test("renders invoice date and payment terms sections", () => {
    renderwithProviders();

    const invoiceDateLabel = screen.getByText(/Invoice Date/i);
    expect(invoiceDateLabel).toBeInTheDocument();

    const datePickerButton = screen.getByRole("button", {
      name: /calendar icon/i,
    });
    expect(datePickerButton).toBeInTheDocument();

    const paymentTermsLabel = screen.getByText(/Payment Terms/i);
    expect(paymentTermsLabel).toBeInTheDocument();

    const paymentTermsButton = screen.getByRole("button", {
      name: /dropdown arrow/i,
    });
    expect(paymentTermsButton).toBeInTheDocument();
  });

  test("toggles the date picker when the date button is clicked", async () => {
    renderwithProviders();

    const datePickerButton = screen.getByRole("button", {
      name: /06 Jan 2023/i,
    });

    await userEvent.click(datePickerButton);
    expect(
      screen.getByRole("button", { name: /left arrow icon/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /right arrow icon/i }),
    ).toBeInTheDocument();
    await userEvent.click(datePickerButton);
    expect(
      screen.queryByRole("button", { name: /left arrow icon/i }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /right arrow icon/i }),
    ).not.toBeInTheDocument();
  });

  test("toggles the payment terms dropdown when the button is clicked", async () => {
    renderwithProviders();

    const paymentTermsButton = screen.getByRole("button", {
      name: /Net 30 Days/i,
    });
    expect(screen.queryByText(/Net 15 Days/i)).not.toBeInTheDocument();

    await userEvent.click(paymentTermsButton);
    expect(
      screen.getByRole("button", { name: /Net 14 Days/i }),
    ).toBeInTheDocument();

    await userEvent.click(paymentTermsButton);
    expect(
      screen.queryByRole("button", { name: /Net 14 Days/i }),
    ).not.toBeInTheDocument();
  });

  test("updates the form value when a date is selected", async () => {
    renderwithProviders();

    const datePickerButton = screen.getByRole("button", {
      name: /06 Jan/i,
    });

    await userEvent.click(datePickerButton);

    const dateButton = screen.getByRole("button", { name: "20" });
    await userEvent.click(dateButton);

    expect(datePickerButton).toHaveTextContent(/20 Jan/i);
  });

  test("updates the form value when a payment term is selected", async () => {
    renderwithProviders();

    const paymentTermsButton = screen.getByRole("button", {
      name: /Net 30 Days/i,
    });

    await userEvent.click(paymentTermsButton);

    const paymentOption = screen.getByText(/Net 14 Days/i);
    await userEvent.click(paymentOption);

    expect(paymentTermsButton).toHaveTextContent(/Net 14 Days/i);
  });

  test("hides the dropdowns when clicking outside", async () => {
    renderwithProviders();

    const paymentTermsButton = screen.getByRole("button", {
      name: /Net 30 Days/i,
    });

    await userEvent.click(paymentTermsButton);
    expect(screen.getByText(/Net 14 Days/i)).toBeInTheDocument();

    fireEvent.click(document.body);
    expect(screen.queryByText(/Net 14 Days/i)).not.toBeInTheDocument();

    const datePickerButton = screen.getByRole("button", {
      name: /06 Jan/i,
    });

    await userEvent.click(datePickerButton);
    expect(
      screen.getByRole("button", { name: /left arrow icon/i }),
    ).toBeInTheDocument();

    await userEvent.click(document.body);
    expect(
      screen.queryByRole("button", { name: /left arrow icon/i }),
    ).not.toBeInTheDocument();
  });
});
