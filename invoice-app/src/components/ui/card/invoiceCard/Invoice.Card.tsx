import Icon from "../../icon/Icon.tsx";
import arrowRightIcon from "../../../../assets/images/icon-arrow-right.svg";
import Text from "../../typography/text/Text.tsx";
import styles from "./invoicecard.module.css";
import Badge from "../../badge/Badge.tsx";
import formatNumber from "../../../../utils/formatNumber/formatNumber.ts";
import formatDate from "../../../../utils/formatDate/formatDate.ts";
import { Link } from "react-router-dom";
import CardWrapper from "../CardWrapper.tsx";
import Headline from "../../typography/headline/Headline.tsx";

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
  return (
    <Link to={`/${id}`}>
      <CardWrapper className={styles.invoice__card}>
        <Text bold={true} className={styles["invoice__card-id"]}>
          <Text bold={true} type={"span"}>
            #
          </Text>
          {id}
        </Text>
        <Text className={styles["invoice__card-payment-due"]}>
          Due {formatDate(paymentDue)}
        </Text>
        <Text className={styles["invoice__card-client-name"]}>
          {clientName}
        </Text>
        <Headline variant={"h3"} className={styles["invoice__card-total"]}>
          £{formatNumber(total)}
        </Headline>
        <div className={styles["invoice__card-badge-wrapper"]}>
          <Badge status={status} />
          <Icon icon={arrowRightIcon} description={"arrow right"} />
        </div>
      </CardWrapper>
    </Link>
  );
};

export default InvoiceCard;