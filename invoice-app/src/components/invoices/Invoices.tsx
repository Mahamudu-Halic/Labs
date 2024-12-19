import Wrapper from "../ui/wrapper/Wrapper.tsx";
import "./invoice.styles.css";
import Header from "../header/Header.tsx";
import InvoiceCard from "../ui/card/invoiceCard/Invoice.Card.tsx";

const Invoices = () => {
  return (
    <Wrapper className={"invoices"}>
      <Header />
      <InvoiceCard
        id={"RT3080"}
        paymentDue={"2021-08-19"}
        status={"paid"}
        clientName={"Jensen Huang"}
        total={1800.9}
      />
      <InvoiceCard
        id={"XM9141"}
        paymentDue={"2021-09-20"}
        status={"pending"}
        clientName={"Alex Grim"}
        total={556.0}
      />
      <InvoiceCard
        id={"RG0314"}
        paymentDue={"2021-10-01"}
        status={"draft"}
        clientName={"John Morrison"}
        total={14002.33}
      />
    </Wrapper>
  );
};

export default Invoices;
