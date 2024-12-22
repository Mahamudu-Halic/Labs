import Text from "../../ui/typography/text/Text.tsx";
import Badge from "../../ui/badge/Badge.tsx";
import Button from "../../ui/button/button.tsx";
import CardWrapper from "../../ui/card/CardWrapper.tsx";
import DeleteModal from "../delete-modal/DeleteModal.tsx";
import { updateInvoiceStatus } from "../../../features/invoice/invoice.slice.ts";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux.ts";
import {
  selectDeleteDialog,
  toggleModal,
} from "../../../features/modal/modal.slice.tsx";

interface InvoiceNoticeProps {
  status: string;
  id: string;
  loading: string;
  error: string;
}

const InvoiceNotice = ({ status, id, loading }: InvoiceNoticeProps) => {
  const deleteDialog = useAppSelector(selectDeleteDialog);
  const dispatch = useAppDispatch();
  return (
    <CardWrapper className={"invoice__notice-wrapper"}>
      <div className={"invoice__status-wrapper"}>
        <Text className={"status"}>Status</Text>
        <Badge status={status} />
      </div>

      <div className={"invoice__button-wrapper"}>
        {status !== "paid" && (
          <Button
            variant={"tertiary"}
            radius={"rounded-full"}
            disabled={loading === "loading"}
          >
            Edit
          </Button>
        )}
        <Button
          variant={"danger"}
          radius={"rounded-full"}
          onClick={() => dispatch(toggleModal("showDeleteDialog"))}
          disabled={loading === "loading"}
        >
          Delete
        </Button>
        {status !== "paid" && (
          <Button
            variant={"primary"}
            radius={"rounded-full"}
            disabled={status === "draft" || loading === "loading"}
            onClick={() => dispatch(updateInvoiceStatus(id))}
          >
            Mark as Paid
          </Button>
        )}
      </div>

      {deleteDialog && (
        <DeleteModal
          onClose={() => dispatch(toggleModal("showDeleteDialog"))}
          id={id}
        />
      )}
    </CardWrapper>
  );
};

export default InvoiceNotice;
