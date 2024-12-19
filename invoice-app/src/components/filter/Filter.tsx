import "./filter.styles.css";
import Button from "../ui/button/button.tsx";
import dropdownIcon from "../../assets/images/icon-arrow-down.svg";
import Icon from "../ui/icon/Icon.tsx";
import Dropdown from "../ui/dropdown/Dropdown.tsx";
import { useState } from "react";

const Filter = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleDropdownToggle = () => {
    setShowDropdown((prev) => !prev);
  };
  return (
    <div className={"filter"}>
      <Button onClick={handleDropdownToggle}>
        Filter by status{" "}
        <Icon icon={dropdownIcon} description={"dropdown arrow"} />
      </Button>

      {showDropdown && (
        <>
          <div className="overlay" onClick={handleDropdownToggle}></div>
          <Dropdown options={["paid", "pending", "draft", "none"]} />
        </>
      )}
    </div>
  );
};

export default Filter;
