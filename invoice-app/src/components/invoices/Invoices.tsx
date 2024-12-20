import Wrapper from "../ui/wrapper/Wrapper.tsx";
import "./invoice.styles.css";
import Header from "../header/Header.tsx";
import InvoiceCard from "../ui/card/invoiceCard/Invoice.Card.tsx";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux.ts";
import {
  fetchInvoices,
  selectInvoices,
  selectStatusFilter,
} from "../../features/invoice/invoice.slice.ts";
import { useEffect } from "react";
import NotFound from "../not-found/NotFound.tsx";
import Headline from "../ui/typography/headline/Headline.tsx";
import Text from "../ui/typography/text/Text.tsx";

const Invoices = () => {
  const invoices = useAppSelector(selectInvoices);
  const statusFilter = useAppSelector(selectStatusFilter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchInvoices());
  }, []);

  const filteredInvoices = statusFilter.length
    ? invoices.filter((invoice) => statusFilter.includes(invoice.status))
    : [...invoices];

  return (
    <Wrapper className={"invoices"}>
      <Header total={filteredInvoices.length} />
      <div className="invoices__card-list">
        {filteredInvoices.map((invoice) => (
          <InvoiceCard key={invoice.id} {...invoice} />
        ))}

        {filteredInvoices.length === 0 && (
          <NotFound>
            <Headline variant={"h3"}>There is nothing here</Headline>
            <Text>
              Create an invoice by clicking the <br />
              <strong>New Invoice</strong> button and get started
            </Text>
          </NotFound>
        )}
      </div>
    </Wrapper>
  );
};

export default Invoices;
