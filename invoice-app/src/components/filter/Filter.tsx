import "./filter.styles.css";
import Button from "../ui/button/button.tsx";
import arrowDownIcon from "../../assets/images/icon-arrow-down.svg";
import Icon from "../ui/icon/Icon.tsx";
import { useEffect, useState } from "react";
import FilterDropdown from "./filter-dropdown.tsx";
import Text from "../ui/typography/text/Text.tsx";

const Filter = () => {
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  useEffect(() => {
    const disablePopup = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".filter")) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", disablePopup);
    return () => {
      document.removeEventListener("click", disablePopup);
    };
  }, []);

  return (
    <div className={"filter"}>
      <Button onClick={toggleDropdown}>
        <Text bold className={`filter__by-status-desktop`}>
          Filter by status
        </Text>
        <Text bold className={`filter__by-status-mobile`}>
          Filter
        </Text>
        {/*Filter by status*/}
        <Icon
          className={showDropdown ? "rotate180" : ""}
          size={"sm"}
          icon={arrowDownIcon}
          description={"dropdown arrow"}
        />
      </Button>

      {showDropdown && (
        <>
          <FilterDropdown options={["paid", "pending", "draft"]} />
        </>
      )}
    </div>
  );
};

export default Filter;
