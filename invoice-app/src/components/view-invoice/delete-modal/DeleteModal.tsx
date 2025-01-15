import Text from "../../ui/typography/text/Text.tsx";
import Button from "../../ui/button/button.tsx";
import Headline from "../../ui/typography/headline/Headline.tsx";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContainer } from "../../ui/dialog/Dialog.tsx";

import "./deletemodal.styles.css";
import {
  useDeleteInvoiceMutation,
  useGetInvoicesQuery,
} from "../../../api/invoice.api.ts";
import { toast } from "sonner";
import { useAppDispatch } from "../../../hooks/useRedux.ts";
import { setInvoice } from "../../../features/invoice/invoice.slice.ts";

interface DeleteModalProps {
  onClose: () => void;
  id: string;
}

const DeleteModal = ({ onClose, id }: DeleteModalProps) => {
  const navigate = useNavigate();
  const { refetch } = useGetInvoicesQuery("");
  const dispatch = useAppDispatch();

  const [deleteInvoice, { isLoading }] = useDeleteInvoiceMutation();

  const handleDelete = async () => {
    try {
      toast.loading("deleting invoice...");
      await deleteInvoice(id ?? "").unwrap();

      toast.dismiss();
      toast.success("Invoice deleted successfully");
      dispatch(setInvoice(undefined));
      refetch();
      navigate("/invoices");
    } catch (error: any) {
      toast.dismiss();
      if (error?.originalStatus === 404) return toast.error(error?.data);
      if (error?.status === "FETCH_ERROR")
        return toast.error("Check internet connection");
      if (error?.originalStatus === 403) return toast.error(error?.data);
      if (error?.originalStatus === 401) return toast.error("Unauthorized");
      toast.error("An unexpected error occurred");
      toast.error("An unexpected error occurred");
    }
  };

  // useEffect(() => {
  //   if (loading === "success") {
  //     onClose();
  //     navigate("/");
  //   }
  // }, [loading]);

  return (
    <DialogContainer center={true}>
      <Dialog variant={"secondary"} className={"delete-modal"}>
        <Headline variant={"h2"}>Confirm Deletion</Headline>
        <Text size={"sm"}>
          Are you sure you want to delete invoice #{id}? This action cannot be
          undone.
        </Text>
        <div className={"delete-modal__actions"}>
          <Button
            variant={"tertiary"}
            onClick={onClose}
            className={"delete-modal__cancel"}
            disabled={isLoading}
            radius={"rounded-full"}
          >
            Cancel
          </Button>
          <Button
            variant={"danger"}
            onClick={handleDelete}
            className={"delete-modal__delete"}
            disabled={isLoading}
            radius={"rounded-full"}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </Dialog>
    </DialogContainer>
  );
};

export default DeleteModal;
