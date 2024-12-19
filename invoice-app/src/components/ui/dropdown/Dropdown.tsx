import styles from "./dropdown.module.css";
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux.ts";
import {
  filterInvoices,
  selectStatusFilter,
} from "../../../features/invoice/invoice.slice.ts";

interface DropdownProps {
  options: string[];
}

const Dropdown = ({ options }: DropdownProps) => {
  const statusFilter = useAppSelector(selectStatusFilter);
  const dispatch = useAppDispatch();

  return (
    <div className={styles.dropdown}>
      {options.map((option) => (
        <label key={option} className={styles.dropdownItem} htmlFor={option}>
          <input
            type="checkbox"
            name="dropdown"
            id={option}
            checked={statusFilter.includes(option)}
            onChange={() => dispatch(filterInvoices(option))}
          />
          <span className={styles.custom__checkbox}></span>
          {option}
        </label>
      ))}
    </div>
  );
};

export default Dropdown;
