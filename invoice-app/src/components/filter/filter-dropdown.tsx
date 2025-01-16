import {
  addStatusFilter,
  selectStatusFilter,
} from "../../features/invoice/invoice.slice.ts";
import Dropdown from "../ui/dropdown/Dropdown.tsx";
import { useAppDispatch, useAppSelector } from "../../hooks/useRedux.ts";
import Label from "../ui/label/Label.tsx";

interface FilterDropdownProps {
  options: string[];
}

const FilterDropdown = ({ options }: FilterDropdownProps) => {
  const statusFilter = useAppSelector(selectStatusFilter);
  const dispatch = useAppDispatch();

  return (
    <Dropdown className={"filter__dropdown"}>
      {options.map((option) => (
        <Label
          htmlFor={option}
          className={"dropdown-item"}
          key={option}
          label={
            <>
              <input
                type="checkbox"
                name="dropdown"
                id={option}
                checked={statusFilter.includes(option)}
                onChange={() => dispatch(addStatusFilter(option))}
              />
              <span className={`custom__checkbox`}></span>
              {option}
            </>
          }
        />
      ))}
    </Dropdown>
  );
};

export default FilterDropdown;
