import Text from "../../ui/typography/text/Text.tsx";
import Badge from "../../ui/badge/Badge.tsx";
import Button from "../../ui/button/button.tsx";
import CardWrapper from "../../ui/card/CardWrapper.tsx";

interface InvoiceNoticeProps {
  status: string;
}

const InvoiceNotice = ({ status }: InvoiceNoticeProps) => {
  return (
    <CardWrapper className={"invoice__notice-wrapper"}>
      <div className={"invoice__status-wrapper"}>
        <Text className={"status"}>Status</Text>
        <Badge status={status} />
      </div>

      <div className={"invoice__button-wrapper"}>
        {status !== "paid" && (
          <Button variant={"tertiary"} radius={"rounded-full"}>
            Edit
          </Button>
        )}
        <Button variant={"danger"} radius={"rounded-full"}>
          Delete
        </Button>
        {status !== "paid" && (
          <Button
            variant={"primary"}
            radius={"rounded-full"}
            disabled={status === "draft"}
          >
            Mark as Paid
          </Button>
        )}
      </div>
    </CardWrapper>
  );
};

export default InvoiceNotice;
