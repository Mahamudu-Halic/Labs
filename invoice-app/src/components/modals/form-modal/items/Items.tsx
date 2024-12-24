import Headline from "../../../ui/typography/headline/Headline.tsx";
import Button from "../../../ui/button/button.tsx";
import "./items.styles.css";
import Icon from "../../../ui/icon/Icon.tsx";
import deleteIcon from "../../../../assets/images/icon-delete.svg";
import plusIcon from "../../../../assets/images/icon-plus.svg";
import {
  FieldArrayWithId,
  FieldErrorsImpl,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  useFormContext,
} from "react-hook-form";
import {
  Errors,
  initialItems,
  ItemType,
} from "../../../../types/form.types.ts";

interface ItemsProps {
  fields: FieldArrayWithId<ItemType>[];
  append: UseFieldArrayAppend<ItemType, "items">;
  remove: UseFieldArrayRemove;
}
const Items = ({ remove, fields, append }: ItemsProps) => {
  const {
    watch,
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className={"items"}>
      <Headline variant={"h3"}>Items list</Headline>
      <div className={"items__list"}>
        {fields.map((field, index) => {
          const qty = watch(`items.${index}.quantity`) || 0; // Default to 0 if undefined
          const prc = watch(`items.${index}.price`) || 0;
          const itemErrors =
            errors.items as unknown as FieldErrorsImpl<ItemType>[];

          // const { name, quantity, price } = (itemErrors[index] as Errors) ?? {};
          // console.log(itemErrors);
          return (
            <div className={"items__list-item"} key={field.id}>
              <div className={"item__name"}>
                <label htmlFor={"itemName" + index}>Item Name</label>
                <input
                  id={"itemName" + index}
                  className={
                    Array.isArray(errors.items) &&
                    errors.items[index]?.name &&
                    "error"
                  }
                  type="text"
                  {...register(`items.${index}.name`, {
                    required: "Item name is required",
                    pattern: {
                      value: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
                      message:
                        "Item name cannot contain numbers or invalid characters",
                    },
                  })}
                />
              </div>
              <div className={"item__qty"}>
                <label htmlFor={"itemQty" + index}>Qty</label>
                <input
                  className={
                    Array.isArray(errors.items) &&
                    errors.items[index]?.quantity &&
                    "error"
                  }
                  type="number"
                  id={"itemQty" + index}
                  {...register(`items.${index}.quantity`, {
                    required: "Quantity is required",
                    // valueAsNumber: true,
                    pattern: {
                      value: /^\d+$/,
                      message: "must be a number",
                    } as const,
                  })}
                />
              </div>
              <div className={"item__price"}>
                <label htmlFor={"itemPrice" + index}>Price</label>
                <input
                  className={
                    Array.isArray(errors.items) &&
                    errors.items[index]?.price &&
                    "error"
                  }
                  type="number"
                  id={"itemPrice" + index}
                  {...register(`items.${index}.price`, {
                    required: "Price is required",
                    // valueAsNumber: true,
                    pattern: {
                      value: /^\d+(\.\d{1,2})?$/,
                      message: "Price must be a valid number",
                    } as const,
                  })}
                />
              </div>
              <div className={"item__total"}>
                <label htmlFor="">Total</label>
                <input
                  type="number"
                  id=""
                  value={(qty * prc).toFixed(2)}
                  disabled
                  {...register(`items.${index}.total`, {
                    valueAsNumber: true,
                  })}
                />
              </div>

              <Button
                className={"delete-item__button"}
                onClick={() => remove(index)}
              >
                <Icon icon={deleteIcon} description={"delete icon"} />
              </Button>
            </div>
          );
        })}
      </div>
      <Button
        type={"button"}
        variant={"tertiary"}
        className={"add-item__button"}
        radius={"rounded-full"}
        onClick={() => append(initialItems)}
      >
        <Icon icon={plusIcon} size={"xs"} description={"add icon"} />
        add new item
      </Button>
    </div>
  );
};

export default Items;
