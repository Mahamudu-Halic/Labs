import Wrapper from "../ui/wrapper/Wrapper.tsx";
import "./invoices.styles.css";
import Header from "../header/Header.tsx";
import InvoiceCard from "../ui/card/invoiceCard/Invoice.Card.tsx";
import { useAppSelector } from "../../hooks/useRedux.ts";
import { selectFilteredInvoices } from "../../features/invoice/invoice.slice.ts";
import NotFound from "../not-found/NotFound.tsx";
import Headline from "../ui/typography/headline/Headline.tsx";
import Text from "../ui/typography/text/Text.tsx";
import Form from "../form/Form.tsx";
import { useState } from "react";
import { Invoice } from "../../types/invoice.types.ts";
import { useGetInvoicesQuery } from "../../api/invoice.api.ts";
import Button from "../ui/button/button.tsx";
import Error from "../error/Error.tsx";

const Invoices = () => {
  const { isError, error } = useGetInvoicesQuery();
  const filteredInvoices = useAppSelector(selectFilteredInvoices);
  const [showForm, setShowForm] = useState<boolean>(false);
  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  if (isError) {
    if (error?.originalStatus === 404) {
      return (
        // <NotFound>
        //   <Headline variant={"h3"}>Invoive not found 🙁</Headline>
        //   <Text>
        //     Go to dashboard by clicking the{" "}
        //     <Text bold={true} type={"span"}>
        //       Go back
        //     </Text>{" "}
        //     button to go back
        //   </Text>
        // </NotFound>
        <Error />
      );
    }
  }

  return (
    <>
      {showForm && <Form type={"newInvoice"} toggleForm={toggleForm} />}
      <Wrapper className={"invoices"}>
        <Header total={filteredInvoices.length} toggleForm={toggleForm} />
        <div className="invoices__card-list">
          {filteredInvoices.map((invoice: Invoice) => (
            <InvoiceCard key={invoice.id} {...invoice} />
          ))}

          {filteredInvoices.length === 0 && (
            <NotFound>
              <Headline variant={"h2"}>There is nothing here</Headline>
              <Text>
                Create an invoice by clicking the{" "}
                <Text type={"span"} bold={true}>
                  New Invoice
                </Text>{" "}
                button and get started
              </Text>
            </NotFound>
          )}
        </div>
      </Wrapper>
    </>
  );
};

export default Invoices;
