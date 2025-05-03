import React from "react";
import styles from "./SelectGroup.module.css"; // Correct import using CSS Modules

const SelectGroup = ({
  label,
  name,
  value,
  options,
  onChange = () => {},
  placeholder,
  required = false,
}) => {
  return (
    <div className={styles.selectGroupContainer}>
      <label className={styles.selectLabel}>
        {label}
        {required && <span className={styles.selectRequired}> *</span>}
      </label>

      <div className={styles.selectWrapper}>
        <select
          name={name}
          value={value ?? ""}
          onChange={onChange}
          className={styles.selectElement}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectGroup;
