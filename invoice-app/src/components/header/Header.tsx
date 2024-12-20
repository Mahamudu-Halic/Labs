import Headline from "../ui/typography/headline/Headline.tsx";
import Text from "../ui/typography/text/Text.tsx";
import Button from "../ui/button/button.tsx";
import Icon from "../ui/icon/Icon.tsx";
import Filter from "../filter/Filter.tsx";

import plusIcon from "../../assets/images/icon-plus.svg";
import "./header.styles.css";

const Header = ({ total }: { total?: number }) => {
  return (
    <header className={"invoice__header"}>
      <div>
        <Headline variant={"h2"}>Invoices</Headline>
        <Text>{total ? `There are ${total} total` : `No invoices`}</Text>
      </div>

      <div className={"invoice__header-left__container"}>
        <Filter />
        <Button
          variant={"primary"}
          radius={"rounded-lg"}
          className={"new__invoice-button"}
        >
          <div className={"new__invoice-plus-icon"}>
            <Icon icon={plusIcon} description={"plus icon"} size={"xs"} />
          </div>
          new invoice
        </Button>
      </div>
    </header>
  );
};

export default Header;
