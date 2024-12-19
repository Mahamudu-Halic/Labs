import Button from "../../button/button.tsx";
import Icon from "../../icon/Icon.tsx";
import arrowRightIcon from "../../../../assets/images/icon-arrow-right.svg";
import Text from "../../typography/text/Text.tsx";
import styles from "./invoicecard.module.css";
import Badge from "../../badge/Badge.tsx";
import formatNumber from "../../../../utils/formatNumber/formatNumber.ts";
import formatDate from "../../../../utils/formatDate/formatDate.ts";
import { useNavigate } from "react-router-dom";

interface InvoiceCardProps {
  id: string;
  paymentDue: string;
  status: string;
  clientName: string;
  total: number;
}

const InvoiceCard = ({
  id,
  paymentDue,
  status,
  clientName,
  total,
}: InvoiceCardProps) => {
  const navigate = useNavigate();
  return (
    <Button
      radius={"rounded-md"}
      className={styles.invoice__card}
      onClick={() => navigate(`/${id}`)}
    >
      <Text id={styles["invoice__card-id"]}>#{id}</Text>
      <Text className={styles["invoice__card-payment-due"]}>
        Due: {formatDate(paymentDue)}
      </Text>
      <Text className={styles["invoice__card-client-name"]}>{clientName}</Text>
      <Text className={styles["invoice__card-total"]}>
        {formatNumber(total)}
      </Text>
      <div className={styles["invoice__card-badge-wrapper"]}>
        <Badge status={status} />
        <Icon icon={arrowRightIcon} description={"arrow right"} />
      </div>
    </Button>
  );
};

export default InvoiceCard;
