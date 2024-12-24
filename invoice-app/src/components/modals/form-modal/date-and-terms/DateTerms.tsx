import { useFormContext } from "react-hook-form";
import {
  selectPaymentTerms,
  toggleModal,
} from "../../../../features/modal/modal.slice.tsx";
import Icon from "../../../ui/icon/Icon.tsx";
import arrowDownIcon from "../../../../assets/images/icon-arrow-down.svg";
import Button from "../../../ui/button/button.tsx";
import { useAppDispatch, useAppSelector } from "../../../../hooks/useRedux.ts";
import { Errors } from "../../../../types/form.types.ts";
import Text from "../../../ui/typography/text/Text.tsx";

const DateTerms = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const dispatch = useAppDispatch();
  const showPaymentTerms = useAppSelector(selectPaymentTerms);

  const { createdAt, paymentTerms } = (errors as Errors) ?? {};
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
      {/*<div>*/}
      {/*  <label>Payment Terms</label>*/}
      {/*  <Button*/}
      {/*    type={"button"}*/}
      {/*    onClick={() => dispatch(toggleModal("showPaymentTerms"))}*/}
      {/*  >*/}
      {/*    Filter by status*/}
      {/*    <Icon*/}
      {/*      className={showPaymentTerms ? "rotate180" : ""}*/}
      {/*      size={"sm"}*/}
      {/*      icon={arrowDownIcon}*/}
      {/*      description={"dropdown arrow"}*/}
      {/*    />*/}
      {/*  </Button>*/}
      {/*</div>*/}

      <div>
        <label htmlFor={"paymentTerms"} className={paymentTerms && "error"}>
          Payment Terms
          {paymentTerms && <Text type={"span"}>{paymentTerms?.message}</Text>}
        </label>
        <div className={"select-wrapper"}>
          <select
            className={paymentTerms && "error"}
            id={"paymentTerms"}
            {...register("paymentTerms", {
              valueAsNumber: true,
            })}
          >
            <option value={1}>Net 1 Day</option>
            <option value={7}>Net 7 Days</option>
            <option value={14}>Net 14 Days</option>
            <option value={30}>Net 30 Days</option>
          </select>
          <Icon
            className={showPaymentTerms ? "rotate180" : ""}
            size={"sm"}
            icon={arrowDownIcon}
            description={"dropdown arrow"}
          />
        </div>
      </div>
    </div>
  );
};

export default DateTerms;
