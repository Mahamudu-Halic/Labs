import "./filter.styles.css";
import Button from "../ui/button/button.tsx";
import arrowDownIcon from "../../assets/images/icon-arrow-down.svg";
import Icon from "../ui/icon/Icon.tsx";
import Dropdown from "../ui/dropdown/Dropdown.tsx";
import { useState } from "react";
import Dialog from "../ui/dialog/Dialog.tsx";

const Filter = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleDropdownToggle = () => {
    setShowDropdown((prev) => !prev);
  };
  return (
    <div className={"filter"}>
      <Button onClick={handleDropdownToggle}>
        Filter by status
        <Icon
          className={showDropdown ? "rotate180" : ""}
          size={"sm"}
          icon={arrowDownIcon}
          description={"dropdown arrow"}
        />
      </Button>

      {showDropdown && (
        <>
          <Dialog onClose={handleDropdownToggle} />
          <Dropdown options={["draft", "pending", "paid"]} />
        </>
      )}
    </div>
  );
};

export default Filter;
