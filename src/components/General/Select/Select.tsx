import React from "react";
import styles from "./Select.module.css";
import { IoIosArrowDown } from "react-icons/io";

// Define the type for each option
interface SelectOption {
  value: string;
  label: string;
}

// Define the props type for the Select component
interface SelectProps {
  options: SelectOption[];
  value: string;
  defaultValue?: string;
  onChange: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  defaultValue,
  onChange,
}) => {
  return (
    <div className={styles.selectContainer}>
      <select
        className={styles.select}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {/* Render default option if provided */}
        {defaultValue && <option value="">{defaultValue}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <IoIosArrowDown color="#343A40" className={styles.icon} />
    </div>
  );
};

export default Select;
