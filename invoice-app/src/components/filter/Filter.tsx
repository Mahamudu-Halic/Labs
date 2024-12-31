import "./filter.styles.css";
import Button from "../ui/button/button.tsx";
import arrowDownIcon from "../../assets/images/icon-arrow-down.svg";
import Icon from "../ui/icon/Icon.tsx";
import Dropdown from "../ui/dropdown/Dropdown.tsx";
import { useAppSelector } from "../../hooks/useRedux.ts";
import { mobileSelector } from "../../features/mobile/mobile.slice.tsx";
import { useState } from "react";

const Filter = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const { isMobile } = useAppSelector(mobileSelector);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  return (
    <div className={"filter"}>
      <Button onClick={toggleDropdown}>
        {isMobile ? "Filter" : "Filter by status"}
        <Icon
          className={showDropdown ? "rotate180" : ""}
          size={"sm"}
          icon={arrowDownIcon}
          description={"dropdown arrow"}
        />
      </Button>

      {showDropdown && (
        <>
          <div className="overlay" onClick={toggleDropdown}></div>
          <Dropdown options={["paid", "pending", "draft"]} />
        </>
      )}
    </div>
  );
};

export default Filter;
