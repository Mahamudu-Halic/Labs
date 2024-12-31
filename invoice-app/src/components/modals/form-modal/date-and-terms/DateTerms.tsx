import { useFormContext } from "react-hook-form";

import Icon from "../../../ui/icon/Icon.tsx";
import arrowDownIcon from "../../../../assets/images/icon-arrow-down.svg";
import Button from "../../../ui/button/button.tsx";
import { Errors } from "../../../../types/form.types.ts";
import Text from "../../../ui/typography/text/Text.tsx";
import CustomSelect from "../CustomSelect.tsx";
import { useState } from "react";
import "./dateterms.styles.css";

const DateTerms = () => {
  const {
    register,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();
  const { createdAt, paymentTerms } = (errors as Errors) ?? {};
  const [option, setOption] = useState<number>(getValues("paymentTerms"));
  const [showPaymentTerms, setShowPaymentTerms] = useState<boolean>(false);

  const togglePaymentTerms = () => {
    setShowPaymentTerms((prev) => !prev);
  };
  const handleSelectOption = (value: number) => {
    setOption(value);
    setValue("paymentTerms", value);
    togglePaymentTerms();
  };
  return (
    <div className={"date-term"}>
      <div>
        <label htmlFor={"date"} className={createdAt && "error"}>
          Invoice Date
          {createdAt && <Text type={"span"}>{createdAt?.message}</Text>}
        </label>
        <input
          className={createdAt && "error"}
          id={"date"}
          type={"date"}
          {...register("createdAt", {
            required: "required",
          })}
        />
      </div>
      <div className={`payment-terms`}>
        <label className={paymentTerms ? "error" : ""}>Payment Terms</label>
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
          <>
            <div className={"overlay"} onClick={togglePaymentTerms}></div>
            <CustomSelect handleSelectOption={handleSelectOption} />
          </>
        )}
      </div>
    </div>
  );
};

export default DateTerms;
