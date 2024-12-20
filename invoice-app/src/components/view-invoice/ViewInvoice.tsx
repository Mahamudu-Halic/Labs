import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux.ts";
import {
  getInvoiceById,
  selectInvoice,
} from "../../features/invoice/invoice.slice.ts";
import { useEffect } from "react";
import Headline from "../ui/typography/headline/Headline.tsx";
import Text from "../ui/typography/text/Text.tsx";
import NotFound from "../not-found/NotFound.tsx";
import Wrapper from "../ui/wrapper/Wrapper.tsx";
import arrowLeftIcon from "../../assets/images/icon-arrow-left.svg";
import Icon from "../ui/icon/Icon.tsx";
import CardWrapper from "../ui/card/CardWrapper.tsx";
import formatDate from "../../utils/formatDate/formatDate.ts";

import "./viewinvoice.styles.css";
import Table from "./table/Table.tsx";
import InvoiceNotice from "./invoice-notice/InvoiceNotice.tsx";
import Address from "./address/Address.tsx";
import InvoiceTitle from "./InvoiceTitle.tsx";

const ViewInvoice = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const invoice = useAppSelector(selectInvoice);

  useEffect(() => {
    dispatch(getInvoiceById(id || ""));
  }, [dispatch, id]);

  return (
    <Wrapper className={"view-invoice"}>
      <Link to={"/"} className={"go-back"}>
        <Icon icon={arrowLeftIcon} description={"arrow left"} size={"xs"} />
        <Text bold={true}>Go back</Text>
      </Link>
      {invoice ? (
        <>
          <InvoiceNotice {...invoice} />

          <CardWrapper className={"invoice__details-wrapper"}>
            <div className={"invoice__details__sender-address__wrapper"}>
              <div className={"invoice__details-description"}>
                <Headline variant={"h3"}>
                  <span>#</span>
                  {invoice.id}
                </Headline>
                <InvoiceTitle title={invoice.description} />
              </div>
              <Address
                {...invoice.senderAddress}
                className={"invoice__details__sender-address"}
              />
            </div>

            <div className="invoice__details__recipient-details">
              <div className="invoice__details-date">
                <div className="invoice__date">
                  <InvoiceTitle title={"Invoice Date"} />
                  <Headline variant={"h3"}>
                    {formatDate(invoice.createdAt)}
                  </Headline>
                </div>

                <div className="invoice__payment-due">
                  <InvoiceTitle title={"Payment Due"} />
                  <Headline variant={"h3"}>
                    {formatDate(invoice.paymentDue)}
                  </Headline>
                </div>
              </div>

              <div className="invoice__details__bill-to">
                <InvoiceTitle title={"Bill To"} />
                <Headline variant={"h3"}>{invoice.clientName}</Headline>
                <Address
                  {...invoice.clientAddress}
                  className={"invoice__details__client-address"}
                />
              </div>

              <div className="invoice__details__sent-to">
                <InvoiceTitle title={"Sent to"} />
                <Headline variant={"h3"}>{invoice.clientEmail}</Headline>
              </div>
            </div>

            <CardWrapper className={"invoice__details-receipt"}>
              <CardWrapper className={"invoice__details-receipt__details"}>
                <Table data={invoice.items} />
              </CardWrapper>
              <CardWrapper className={"invoice__details-receipt__amount-due"}>
                <Text size={"sm"}>Amount Due</Text>
                <Headline variant={"h2"}>£{invoice.total}</Headline>
              </CardWrapper>
            </CardWrapper>
          </CardWrapper>
        </>
      ) : (
        <NotFound>
          <Headline variant={"h3"}>Invalid ID 🙁</Headline>
          <Text>
            Go to dashboard by clicking the{" "}
            <Text bold={true} type={"span"}>
              Go back
            </Text>{" "}
            button to go back
          </Text>
        </NotFound>
      )}
    </Wrapper>
  );
};

export default ViewInvoice;
