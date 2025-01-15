import { Errors, FormValues, ItemType } from "../../types/form.types.ts";
import { FormProvider, useForm } from "react-hook-form";
import calculatePaymentDue from "../../utils/calculatePaymentDue/calculatePaymentDue.ts";
import { Dialog, DialogContainer } from "../ui/dialog/Dialog.tsx";
import Button from "../ui/button/button.tsx";
import Icon from "../ui/icon/Icon.tsx";
import arrowLeftIcon from "../../assets/images/icon-arrow-left.svg";
import Text from "../ui/typography/text/Text.tsx";
import Headline from "../ui/typography/headline/Headline.tsx";
import FormAddress from "./address/FormAddress.tsx";
import BillTo from "./bill-to/BillTo.tsx";
import DateTerms from "./date-and-terms/DateTerms.tsx";
import Items from "./items/Items.tsx";
import "./form.styles.css";
import TextField from "../ui/text-field/TextField.tsx";
import { formDefaultValues } from "../../constants.ts";
import Label from "../ui/label/Label.tsx";
import {
  useCreateInvoiceMutation,
  useGetInvoiceByIdQuery,
  useGetInvoicesQuery,
  useUpdateInvoiceMutation,
} from "../../api/invoice.api.ts";
import generateRandomId from "../../utils/generateRandomId/generateRandomId.ts";
import { toast } from "sonner";
import { setInvoice } from "../../features/invoice/invoice.slice.ts";
import { useAppDispatch } from "../../hooks/useRedux.ts";

interface FormProps {
  type: "newInvoice" | "edit";
  initialValues?: FormValues;
  toggleForm: () => void;
}

const Form = ({ toggleForm, initialValues, type }: FormProps) => {
  const form = useForm<FormValues>({
    defaultValues: initialValues ?? {
      ...formDefaultValues,
      id: generateRandomId(),
    },
    mode: "onTouched",
  });

  const {
    handleSubmit,
    setError,
    getValues,
    reset,
    formState: { errors, isValid, isDirty },
  } = form;

  const [createInvoice, { isLoading }] = useCreateInvoiceMutation();
  const { refetch } = useGetInvoicesQuery();
  const dispatch = useAppDispatch();
  const [updateInvoice, { isLoading: updateLoading }] =
    useUpdateInvoiceMutation();

  console.log(getValues("id"));

  const prepareInvoiceData = (status: "draft" | "pending"): FormValues => {
    const data = getValues();
    data.status = status;
    data.items = data.items.map((item: ItemType) => ({
      ...item,
      total: Number((item.price * item.quantity).toFixed(2)),
    }));
    data.total = data.items.reduce((total, item) => total + item.total, 0);
    data.paymentDue = calculatePaymentDue(data.createdAt, data.paymentTerms);
    return data;
  };

  const onSubmit = async (data: FormValues) => {
    if (!data.items.length) {
      setError("items", {
        type: "manual",
        message: "At least one item is required.",
      });
      return;
    }

    try {
      toast.loading(
        type === "newInvoice" ? "Adding invoice..." : "Updating invoice...",
      );
      const invoiceData = prepareInvoiceData("pending");

      const response =
        type === "newInvoice"
          ? await createInvoice(invoiceData).unwrap()
          : await updateInvoice(invoiceData).unwrap();

      toast.dismiss();
      toast.success(
        type === "newInvoice"
          ? "Invoice added successfully"
          : "Invoice updated successfully",
      );

      refetch();
      if (type === "edit") dispatch(setInvoice(response));
      toggleForm();
    } catch (error: any) {
      toast.dismiss();
      if (error?.originalStatus === 403) {
        toast.error(error?.data);
      } else if (error?.originalStatus === 401) {
        toast.error(error?.data);
      } else if (error?.status === "FETCH_ERROR") {
        toast.error("Check internet connection");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const onSaveDraft = async () => {
    try {
      toast.loading("Saving draft...");
      const draftData = prepareInvoiceData("draft");
      await createInvoice(draftData).unwrap();

      toast.dismiss();
      toast.success("Draft saved successfully");
      refetch();
      toggleForm();
    } catch (error: any) {
      toast.dismiss();
      if (error?.originalStatus === 403) {
        toast.error(error?.data);
      } else if (error?.status === "FETCH_ERROR") {
        toast.error("Check internet connection");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const onDiscard = () => {
    reset();
    toggleForm();
  };

  const { description } = (errors as Errors) ?? {};

  return (
    <DialogContainer>
      <Dialog
        className="form-dialog"
        variant="primary"
        radius="rounded-lg"
        size="md"
      >
        <FormProvider {...form}>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="form-info">
              <Button className="go-back" type="button" onClick={toggleForm}>
                <Icon icon={arrowLeftIcon} description="arrow left" size="xs" />
                <Text bold>Go back</Text>
              </Button>

              {type === "newInvoice" ? (
                <Headline variant="h2">New Invoice</Headline>
              ) : (
                <Headline variant="h2">
                  Edit <span>#</span>
                  {initialValues?.id}
                </Headline>
              )}

              <div className="bill-from">
                <Text bold>Bill From</Text>
                <FormAddress field="senderAddress" />
              </div>

              <BillTo />
              <DateTerms />

              <div>
                <Label
                  htmlFor="description"
                  label="Project Description"
                  error={description?.message}
                  showError
                />
                <TextField
                  name="description"
                  id="description"
                  className={description ? "error" : ""}
                  validationRules={{ required: "Can't be empty" }}
                />
              </div>

              <Items />

              {!!Object.keys(errors).length && (
                <Text size="sm" className="error">
                  - All fields must be added
                </Text>
              )}
            </div>

            <div className="form__buttons">
              {type === "newInvoice" ? (
                <>
                  <Button
                    type="button"
                    radius="rounded-full"
                    variant="tertiary"
                    className="discard__button"
                    onClick={onDiscard}
                    disabled={isLoading}
                  >
                    Discard
                  </Button>
                  <Button
                    type="button"
                    radius="rounded-full"
                    variant="secondary"
                    onClick={onSaveDraft}
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save as Draft"}
                  </Button>
                  <Button
                    type="submit"
                    radius="rounded-full"
                    variant="primary"
                    disabled={
                      !isValid ||
                      !isDirty ||
                      !getValues("items").length ||
                      !getValues("createdAt") ||
                      isLoading
                    }
                  >
                    {isLoading ? "Saving..." : "Save & Send"}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type="button"
                    radius="rounded-full"
                    variant="secondary"
                    onClick={onDiscard}
                    disabled={updateLoading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    radius="rounded-full"
                    variant="primary"
                    disabled={
                      !isValid ||
                      !getValues("items").length ||
                      !getValues("createdAt") ||
                      updateLoading
                    }
                  >
                    {updateLoading ? "Saving..." : "Save changes"}
                  </Button>
                </>
              )}
            </div>
          </form>
        </FormProvider>
      </Dialog>
    </DialogContainer>
  );
};

export default Form;
