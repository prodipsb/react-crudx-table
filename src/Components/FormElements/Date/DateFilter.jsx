import React from "react";
import styles from "./DateFilter.module.css"; // Reusing your CSS for consistency

const DateFilter = ({
  name,
  label = "Date Filter",
  value,
  onChange,
  required = false,
  className = "",
}) => {
  const handleStartChange = (e) => {
    onChange({
      target: {
        name,
        value: e.target.value,
      },
    });
  };
  


  return (
    <div className={`${styles.inputFieldContainer} ${className}`}>
      <label className={styles.inputLabel}>
        {label}
        {required && <span className={styles.inputRequired}> *</span>}
      </label>

      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="date"
          value={value}
          onChange={handleStartChange}
          required={required}
          className={styles.inputElement}
        />
      </div>
    </div>
  );
};

export default DateFilter;
