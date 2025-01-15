import Button from "../../ui/button/button.tsx";
import {
  selectInvoice,
  setInvoice,
} from "../../../features/invoice/invoice.slice.ts";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux.ts";
import { useUpdateInvoiceMutation } from "../../../api/invoice.api.ts";
import { toast } from "sonner";

interface InvoiceNoticeButtonsProps {
  toggleDeleteModal: () => void;
  toggleForm: () => void;
}

const InvoiceNoticeButtons = ({
  toggleDeleteModal,
  toggleForm,
}: InvoiceNoticeButtonsProps) => {
  const dispatch = useAppDispatch();
  const invoice = useAppSelector(selectInvoice);

  const [updateInvoice, { isLoading }] = useUpdateInvoiceMutation();
  const handleUpdateInvoiceStatus = async () => {
    try {
      toast.loading("updating invoice status...");

      const response = await updateInvoice({
        ...invoice!,
        status: "paid",
      }).unwrap();

      toast.dismiss();

      dispatch(setInvoice(response));
      toast.success("Invoice updated successfully");
    } catch (error) {
      toast.dismiss();
      if (
        typeof error === "object" &&
        error !== null &&
        "originalStatus" in error
      ) {
        const rtkError = error as { originalStatus: number; data?: string };

        if (rtkError.originalStatus === 403) {
          toast.error(rtkError.data || "Forbidden");
        } else if (rtkError.originalStatus === 401) {
          toast.error(rtkError.data || "Unauthorized");
        }
      } else if (
        typeof error === "object" &&
        error !== null &&
        "status" in error
      ) {
        const networkError = error as { status: string };
        if (networkError.status === "FETCH_ERROR") {
          toast.error("Check internet connection");
        }
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className={"invoice__button-wrapper"}>
      <Button
        variant={"tertiary"}
        radius={"rounded-full"}
        disabled={isLoading}
        onClick={toggleForm}
      >
        Edit
      </Button>
      <Button
        variant={"danger"}
        radius={"rounded-full"}
        onClick={toggleDeleteModal}
        disabled={isLoading}
      >
        Delete
      </Button>
      {invoice?.status !== "paid" && (
        <Button
          variant={"primary"}
          radius={"rounded-full"}
          disabled={invoice?.status === "draft" || isLoading}
          onClick={handleUpdateInvoiceStatus}
        >
          Mark as Paid
        </Button>
      )}
    </div>
  );
};

export default InvoiceNoticeButtons;
