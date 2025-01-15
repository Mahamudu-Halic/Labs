import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux.ts";
import {
  selectInvoice,
  setInvoice,
} from "../../features/invoice/invoice.slice.ts";
import { useGetInvoiceByIdQuery } from "../../api/invoice.api.ts";
import arrowLeftIcon from "../../assets/images/icon-arrow-left.svg";
import Headline from "../ui/typography/headline/Headline.tsx";
import Text from "../ui/typography/text/Text.tsx";
import NotFound from "../not-found/NotFound.tsx";
import Wrapper from "../ui/wrapper/Wrapper.tsx";
import Icon from "../ui/icon/Icon.tsx";
import CardWrapper from "../ui/card/CardWrapper.tsx";
import formatDate from "../../utils/formatDate/formatDate.ts";
import Table from "./table/Table.tsx";
import InvoiceNotice from "./invoice-notice/InvoiceNotice.tsx";
import Address from "./address/Address.tsx";
import InvoiceTitle from "./InvoiceTitle.tsx";
import InvoiceNoticeButtons from "./invoice-notice/InvoiceNoticeButtons.tsx";
import Form from "../form/Form.tsx";
import Button from "../ui/button/button.tsx";
import "./viewinvoice.styles.css";

const ViewInvoice = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetInvoiceByIdQuery(id ?? "");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const invoice = useAppSelector(selectInvoice);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  const toggleDeleteModal = () => {
    setShowDeleteModal((prev) => !prev);
  };

  useEffect(() => {
    dispatch(setInvoice(data));
  }, [data, dispatch]);

  if (isLoading) return <div>loading...</div>;

  if (isError && error?.originalStatus !== 404) {
    // if (error?.originalStatus === 401) {
    //   return (
    //     <NotFound>
    //       <Headline variant={"h3"}>
    //         You are not authorized to view this page
    //       </Headline>
    //       <Button onClick={() => navigate("/invoices")}>Go to home</Button>
    //     </NotFound>
    //   );
    // }

    if (error?.status === "FETCH_ERROR") {
      return (
        <NotFound>
          <Headline variant={"h3"}>Check internet connection 🙁</Headline>
        </NotFound>
      );
    }

    return (
      <NotFound>
        <Headline variant={"h3"}>An unexpected error occurred 🙁</Headline>
        {/*<Button onClick={() => refetch()}>Reload page</Button>*/}
      </NotFound>
    );
  }
  return (
    <>
      <div className={"view__invoice-container"}>
        {showForm && (
          <Form toggleForm={toggleForm} type={"edit"} initialValues={invoice} />
        )}
        <Wrapper>
          <Button className={"go-back"} onClick={() => navigate("/invoices")}>
            <Icon icon={arrowLeftIcon} description={"arrow left"} size={"xs"} />
            Go back
          </Button>
        </Wrapper>
        {error && error?.originalStatus === 404 ? (
          <NotFound>
            <Headline variant={"h3"}>Invoive not found 🙁</Headline>
            <Text>
              Go to dashboard by clicking the{" "}
              <Text bold={true} type={"span"}>
                Go back
              </Text>{" "}
              button to go back
            </Text>
          </NotFound>
        ) : (
          <>
            <Wrapper className={"view__invoice"}>
              <InvoiceNotice
                {...invoice}
                toggleForm={toggleForm}
                toggleDeleteModal={toggleDeleteModal}
                showDeleteModal={showDeleteModal}
              />
              <CardWrapper className={"invoice__details-wrapper"}>
                <div className={"invoice__details__sender-address__wrapper"}>
                  <div className={"invoice__details-description"}>
                    <Headline variant={"h3"}>
                      <span>#</span>
                      {invoice?.id}
                    </Headline>
                    <InvoiceTitle title={invoice?.description ?? ""} />
                  </div>
                  <Address
                    {...invoice?.senderAddress}
                    className={"invoice__details__sender-address"}
                  />
                </div>

                <div className="invoice__details__recipient-details">
                  <div
                    className={
                      "invoice__details__recipient-details-date__address"
                    }
                  >
                    <div className="invoice__details-date">
                      <div className="invoice__date">
                        <InvoiceTitle title={"Invoice Date"} />
                        <Headline variant={"h3"}>
                          {invoice?.createdAt && formatDate(invoice?.createdAt)}
                        </Headline>
                      </div>

                      <div className="invoice__payment-due">
                        <InvoiceTitle title={"Payment Due"} />
                        <Headline variant={"h3"}>
                          {invoice?.paymentDue &&
                            formatDate(invoice?.paymentDue)}
                        </Headline>
                      </div>
                    </div>

                    <div className="invoice__details__bill-to">
                      <InvoiceTitle title={"Bill To"} />
                      <Headline variant={"h3"}>
                        {invoice?.clientName ?? ""}
                      </Headline>
                      <Address
                        {...invoice?.clientAddress}
                        className={"invoice__details__client-address"}
                      />
                    </div>
                  </div>

                  <div className="invoice__details__sent-to">
                    <InvoiceTitle title={"Sent to"} />
                    <Headline variant={"h3"}>{invoice?.clientEmail}</Headline>
                  </div>
                </div>

                <CardWrapper className={"invoice__details-receipt"}>
                  <CardWrapper className={"invoice__details-receipt__details"}>
                    <Table data={invoice?.items} />
                  </CardWrapper>
                  <CardWrapper
                    className={"invoice__details-receipt__amount-due"}
                  >
                    <Text size={"sm"} className={"amount-due-desktop"}>
                      Amount Due
                    </Text>
                    <Text size={"sm"} className={"amount-due-mobile"}>
                      Grand Total
                    </Text>

                    <Headline variant={"h2"}>£{invoice?.total}</Headline>
                  </CardWrapper>
                </CardWrapper>
              </CardWrapper>
            </Wrapper>
            <CardWrapper className="button-wrapper">
              <InvoiceNoticeButtons
                toggleForm={toggleForm}
                toggleDeleteModal={toggleDeleteModal}
              />
            </CardWrapper>
          </>
        )}
      </div>
    </>
  );
};

export default ViewInvoice;
