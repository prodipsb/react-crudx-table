import React from "react";
import styles from "./Textarea.module.css";

const TextArea = ({
  name,
  value = "",
  placeholder,
  onChange,
  className = "",
  rows = 6,
  required = false,
  label,
}) => {
  return (
    <div className={`${styles.textareaGroup} ${className}`}>
      {label && (
        <label className={styles.textareaLabel}>
          {label}
          {required && <span className={styles.textareaRequired}>*</span>}
        </label>
      )}
      <textarea
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        rows={rows}
        required={required}
        className={styles.textareaElement}
      />
    </div>
  );
};

export default TextArea;
