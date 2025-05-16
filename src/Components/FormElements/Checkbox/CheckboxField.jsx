import React from "react";
import styles from "./CheckboxField.module.css";

const CheckboxField = ({
  label,
  name,
  value,
  checked = false,
  onChange = () => {},
  className = "",
  required = false,
}) => {
  return (
    <div className={`${styles.inputFieldContainer} ${className}`}>
      <label className={styles.inputLabel}>
        <input
          type="checkbox"
          name={name}
          value={value} // ✅ Add value here
          checked={checked}
          onChange={onChange}
          required={required}
          className={styles.inputElement}
          style={{ width: "16px", height: "16px", marginRight: "8px" }}
        />
        {label}
        {required && <span className={styles.inputRequired}> *</span>}
      </label>
    </div>
  );
};

export default CheckboxField;
