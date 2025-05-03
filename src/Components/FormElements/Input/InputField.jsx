import React from "react";
import styles from "./InputField.module.css";

const InputField = ({ 
  type, 
  label, 
  name, 
  value = "", 
  placeholder, 
  onChange = () => {},
  className = "",
  required = false 
}) => {
  return (
    <div className={`${styles.inputFieldContainer} ${className}`}>
      <label className={styles.inputLabel}>
        {label}
        {required && <span className={styles.inputRequired}> *</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        className={styles.inputElement}
      />
    </div>
  );
};

export default InputField;
