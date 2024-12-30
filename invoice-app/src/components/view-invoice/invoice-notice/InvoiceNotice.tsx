import Text from "../../ui/typography/text/Text.tsx";
import Badge from "../../ui/badge/Badge.tsx";
import CardWrapper from "../../ui/card/CardWrapper.tsx";

import InvoiceNoticeButtons from "./InvoiceNoticeButtons.tsx";
import DeleteModal from "../../modals/delete-modal/DeleteModal.tsx";
import {
  selectDeleteDialog,
  toggleModal,
} from "../../../features/modal/modal.slice.tsx";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux.ts";

interface InvoiceNoticeProps {
  status: string;
  error: string | null;
  id: string;
}

const InvoiceNotice = ({ id, status }: InvoiceNoticeProps) => {
  const deleteDialog = useAppSelector(selectDeleteDialog);
  const dispatch = useAppDispatch();

  return (
    <CardWrapper className={"invoice__notice-wrapper"}>
      <div className={"invoice__status-wrapper"}>
        <Text className={"status"}>Status</Text>
        <Badge status={status} />
      </div>
      {deleteDialog && (
        <DeleteModal
          onClose={() => dispatch(toggleModal("showDeleteDialog"))}
          id={id ?? ""}
        />
      )}
      <InvoiceNoticeButtons />
    </CardWrapper>
  );
};

export default InvoiceNotice;
