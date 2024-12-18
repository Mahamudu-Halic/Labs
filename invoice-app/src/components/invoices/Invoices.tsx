import Container from "../ui/container/Container.tsx";
import "./invoice.styles.css"
import Header from "../header/Header.tsx";

const Invoices = () => {
    return (
        <Container container={"section"} className={"invoices"}>
            <Header/>
        </Container>
    )
}

export default Invoices;