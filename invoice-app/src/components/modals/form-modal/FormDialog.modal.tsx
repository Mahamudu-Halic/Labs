import { Dialog, DialogContainer } from "../../ui/dialog/Dialog.tsx";
import { Form } from "../../ui/form/Form.tsx";
import "./formdialogmodal.styles.css";
import Headline from "../../ui/typography/headline/Headline.tsx";
import Text from "../../ui/typography/text/Text.tsx";
import Button from "../../ui/button/button.tsx";
import FormAddress from "./address/FormAddress.tsx";
import BillTo from "./bill-to/BillTo.tsx";
import DateTerms from "./date-and-terms/DateTerms.tsx";
import Items from "./items/Items.tsx";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { Errors, FormValues, initialItems } from "../../../types/form.types.ts";
import calculatePaymentDue from "../../../utils/calculatePaymentDue/calculatePaymentDue.ts";
import generateRandomId from "../../../utils/generateRandomId/generateRandomId.ts";

const FormDialogModal = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      id: "",
      clientName: "",
      clientEmail: "",
      createdAt: "",
      paymentDue: "",
      description: "",
      paymentTerms: 1,
      clientAddress: {
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
      senderAddress: {
        street: "",
        city: "",
        postCode: "",
        country: "",
      },
      items: [
        {
          ...initialItems,
        },
      ],
    },
    mode: "onTouched",
  });
  const {
    register,
    control,
    handleSubmit,
    setValue,
    setError,

    getValues,
    reset,
    formState: { errors, isValid, isDirty, isSubmitSuccessful },
  } = form;
  const { fields, append, remove } = useFieldArray({
    name: "items",
    control,
  });

  const onSubmit = (data: FormValues) => {
    if (!data.items.length) {
      setError("items", {
        type: "manual",
        message: "At least one item is required.",
      });
      return;
    }
    const newItems = data.items.map((item) => ({
      ...item,
      total: Number((item?.price * item?.quantity).toFixed(2)),
    }));

    const paymentDue = calculatePaymentDue(data.createdAt, data.paymentTerms);
    const id = generateRandomId();
    const newData = { ...data, id, paymentDue, items: newItems };
    console.log("New Data:", newData);
  };

  const { description } = (errors as Errors) ?? {};
  console.log(isValid, isDirty);
  return (
    <DialogContainer>
      <Dialog
        className={"form-dialog"}
        variant={"primary"}
        radius={"rounded-lg"}
        size={"md"}
      >
        <FormProvider {...form}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Headline variant={"h2"}>New Invoice</Headline>

            <div className={"bill-from"}>
              <Text bold={true}>Bill From</Text>
              <FormAddress field={"senderAddress"} />
            </div>

            <BillTo />

            <DateTerms />

            <div>
              <label htmlFor="description" className={description && "error"}>
                Project Description{" "}
                <Text size={"sm"}>{description?.message}</Text>{" "}
              </label>
              <input
                id={"description"}
                className={description && "error"}
                type="text"
                {...register("description", {
                  required: "can't be empty",
                })}
              />
            </div>

            <Items fields={fields} append={append} remove={remove} />

            {!!Object.keys(errors).length && (
              <div>
                <Text size={"sm"} className={"error"}>
                  -All fields must be added
                </Text>
                {!getValues("items").length && (
                  <Text size={"sm"} className={"error"}>
                    -An item must be added
                  </Text>
                )}
              </div>
            )}
            <div className={"form-dialog__buttons"}>
              <Button
                type={"button"}
                radius={"rounded-full"}
                variant={"tertiary"}
                className={"discard__button"}
                onClick={() => reset()}
              >
                Discard
              </Button>
              <Button
                type={"button"}
                radius={"rounded-full"}
                variant={"secondary"}
              >
                Save as Draft
              </Button>
              <Button
                radius={"rounded-full"}
                variant={"primary"}
                disabled={!isValid || !isDirty}
              >
                Save & Send
              </Button>
            </div>
          </Form>
        </FormProvider>
        <DevTool control={control} />
      </Dialog>
    </DialogContainer>
  );
};

export default FormDialogModal;
