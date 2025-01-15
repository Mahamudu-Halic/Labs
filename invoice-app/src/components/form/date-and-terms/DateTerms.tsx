import { useFormContext } from "react-hook-form";

import Icon from "../../ui/icon/Icon.tsx";
import arrowDownIcon from "../../../assets/images/icon-arrow-down.svg";
import Button from "../../ui/button/button.tsx";
import { Errors } from "../../../types/form.types.ts";
import CustomSelect from "../CustomSelect.tsx";
import { useEffect, useState } from "react";
import "./dateterms.styles.css";
import DatePicker from "../../ui/date-picker/DatePicker.tsx";
import calendarIcon from "../../../assets/images/icon-calendar.svg";
import formatDate from "../../../utils/formatDate/formatDate.ts";
import Label from "../../ui/label/Label.tsx";

const DateTerms = () => {
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const { createdAt, paymentTerms } = (errors as Errors) ?? {};

  const [option, setOption] = useState<number>(getValues("paymentTerms"));
  const [showPaymentTerms, setShowPaymentTerms] = useState<boolean>(false);
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [invoiceDate, setInvoiceDate] = useState<string>(
    getValues("createdAt"),
  );

  const toggleDatePicker = () => {
    setShowDatePicker((prev) => !prev);
  };

  const togglePaymentTerms = () => {
    setShowPaymentTerms((prev) => !prev);
  };
  const handleSelect = (value: number | string, field?: string) => {
    if (field && field === "datepicker") {
      setValue("createdAt", value);
      setInvoiceDate(value as string);
      toggleDatePicker();
      return;
    }
    setOption(value as number);
    setValue("paymentTerms", value);
    togglePaymentTerms();
  };

  useEffect(() => {
    const disablePopup = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      if (!target.closest(".payment-terms")) {
        setShowPaymentTerms(false);
      }

      if (!target.closest(".invoice-date")) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener("click", disablePopup);
    const form = document.getElementsByTagName("form")[0];
    if (form) {
      form.addEventListener("click", disablePopup);
    }

    return () => {
      document.removeEventListener("click", disablePopup);

      if (form) {
        form.removeEventListener("click", disablePopup);
      }
    };
  }, []);

  return (
    <div className={"date-term"}>
      <div className={"invoice-date"}>
        <Label
          htmlFor={"date"}
          label={"Invoice Date"}
          error={createdAt?.message}
          showError
        />
        <Button
          type={"button"}
          onClick={toggleDatePicker}
          className={showDatePicker ? "active" : ""}
        >
          {invoiceDate ? formatDate(invoiceDate) : ""}{" "}
          <Icon icon={calendarIcon} description={"calendar icon"} />
        </Button>

        {showDatePicker && (
          <DatePicker
            handleSelection={handleSelect}
            selectedDate={invoiceDate ?? ""}
          />
        )}
      </div>
      <div className={`payment-terms`}>
        <Label
          htmlFor={"paymentTerms"}
          label={"Payment Terms"}
          error={paymentTerms?.message}
          showError
        />
        <Button
          className={`${showPaymentTerms ? "active" : ""}`}
          type={"button"}
          onClick={togglePaymentTerms}
        >
          Net {option} Day{option > 1 && "s"}
          <Icon
            className={showPaymentTerms ? "rotate180" : ""}
            size={"sm"}
            icon={arrowDownIcon}
            description={"dropdown arrow"}
          />
        </Button>

        {showPaymentTerms && (
          <CustomSelect
            handleSelectOption={handleSelect}
            selectedOption={option}
          />
        )}
      </div>
    </div>
  );
};

export default DateTerms;
