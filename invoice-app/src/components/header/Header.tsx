import Container from "../ui/container/Container.tsx";
import Headline from "../ui/typography/headline/Headline.tsx";
import Text from "../ui/typography/text/Text.tsx";
import Button from "../ui/button/button.tsx";
import Icon from "../ui/icon/Icon.tsx";
import Filter from "../filter/Filter.tsx";

import plusIcon from "../../assets/images/icon-plus.svg";
import "./header.styles.css"

const Header = () => {
    return (
        <header className={"invoice__header"}>
            <Container container={"div"}>
                <Headline variant={"h2"}>Invoices</Headline>
                <Text>There are 7 total</Text>
            </Container>

            <Container container={"div"} className={"invoice__header-left__container"}>
                <Filter/>
                <Button variant={"primary"} radius={"rounded-lg"} className={"new__invoice-button"}>
                    <Container container={"div"} className={"new__invoice-plus-icon"}>
                        <Icon icon={plusIcon} description={"plus icon"}/>
                    </Container>
                    new invoice
                </Button>
            </Container>
        </header>
    )
}

export default Header;