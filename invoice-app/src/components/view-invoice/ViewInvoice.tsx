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
import Badge from "../ui/badge/Badge.tsx";
import Button from "../ui/button/button.tsx";
import formatDate from "../../utils/formatDate/formatDate.ts";

import "./viewinvoice.styles.css";
import Table from "./table/Table.tsx";

const ViewInvoice = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const invoice = useAppSelector(selectInvoice);

  useEffect(() => {
    dispatch(getInvoiceById(id || ""));
  }, [dispatch, id]);

  console.log(invoice);
  return (
    <Wrapper className={"view-invoice"}>
      <Link to={"/"} className={"go-back"}>
        <Icon icon={arrowLeftIcon} description={"arrow left"} size={"xs"} />
        Go back
      </Link>
      {invoice ? (
        <>
          <CardWrapper className={"invoice__notice-wrapper"}>
            <div className={"invoice__status-wrapper"}>
              <Text>Status</Text>
              <Badge status={invoice.status} />
            </div>

            <div className={"invoice__button-wrapper"}>
              <Button variant={"tertiary"} radius={"rounded-full"}>
                Edit
              </Button>
              <Button variant={"danger"} radius={"rounded-full"}>
                Delete
              </Button>
              {invoice.status === "pending" && (
                <Button variant={"primary"} radius={"rounded-full"}>
                  Mark as Paid
                </Button>
              )}
            </div>
          </CardWrapper>

          <CardWrapper className={"invoice__details-wrapper"}>
            <div className={"invoice__item__sender-address__wrapper"}>
              <div className={"invoice__description"}>
                <Headline variant={"h2"}>
                  <Text>#</Text>
                  {invoice.id}
                </Headline>
                <Text>{invoice.description}</Text>
              </div>
              <div className="invoice__item__sender-address">
                <Text>{invoice.senderAddress.street}</Text>
                <Text>{invoice.senderAddress.city}</Text>
                <Text>{invoice.senderAddress.postCode}</Text>
                <Text>{invoice.senderAddress.country}</Text>
              </div>
            </div>

            <div className="invoice__item__recipient-details">
              <div className="invoice__item-date">
                <div className="invoice__date">
                  <Text>Invoice Date</Text>
                  <Headline variant={"h3"}>
                    {formatDate(invoice.createdAt)}
                  </Headline>
                </div>

                <div className="invoice__payment-due">
                  <Text>Payment Due</Text>
                  <Headline variant={"h3"}>
                    {formatDate(invoice.paymentDue)}
                  </Headline>
                </div>
              </div>

              <div className="invoice__item__bill-to">
                <Text>Bill To</Text>
                <Headline variant={"h3"}>{invoice.clientName}</Headline>
                <Text>{invoice.clientAddress.street}</Text>
                <Text>{invoice.clientAddress.city}</Text>
                <Text>{invoice.clientAddress.postCode}</Text>
                <Text>{invoice.clientAddress.country}</Text>
              </div>

              <div className="invoice__item__sent-to">
                <Text>Sent to</Text>
                <Headline variant={"h3"}>{invoice.clientEmail}</Headline>
              </div>
            </div>

            <CardWrapper className={"invoice__item-receipt"}>
              <CardWrapper className={"invoice__item-receipt__details"}>
                <Table data={invoice.items} />
              </CardWrapper>
              <CardWrapper className={"invoice__item-receipt__amount-due"}>
                <Text>Amount Due</Text>
                <Headline variant={"h1"}>£{invoice.total}</Headline>
              </CardWrapper>
            </CardWrapper>
          </CardWrapper>
        </>
      ) : (
        <NotFound>
          <Headline variant={"h3"}>Invalid ID 🙁</Headline>
          <Text>
            Go to dashboard by clicking the <br />
            <strong>Go back</strong> button to go back
          </Text>
        </NotFound>
      )}
    </Wrapper>
  );
};

export default ViewInvoice;
