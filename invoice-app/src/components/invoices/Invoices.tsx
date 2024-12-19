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

        {filteredInvoices.length === 0 && <p>No invoices found.</p>}
      </div>
    </Wrapper>
  );
};

export default Invoices;
