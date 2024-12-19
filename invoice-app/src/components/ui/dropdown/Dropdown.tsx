import styles from "./dropdown.module.css";

interface DropdownProps {
  options: string[];
}

const Dropdown = ({ options }: DropdownProps) => {
  return (
    <div className={styles.dropdown}>
      {options.map((option) => (
        <label key={option} className={styles.dropdownItem} htmlFor={option}>
          <input type="checkbox" name="dropdown" id={option} />
          <span className={styles.custom__checkbox}></span>
          {option}
        </label>
      ))}
    </div>
  );
};

export default Dropdown;
