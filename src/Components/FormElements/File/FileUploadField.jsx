import React from "react";
import styles from "./FileUpload.module.css";

const FileUploadField = ({
  label,
  name,
  value,
  baseUrl,
  accept = "*",
  onChange = () => {},
  className = "",
  required = false,
  multiple = false,
}) => {
  const inputId = `upload-${name}`;

  return (
    <div className={`${styles.inputFieldContainer} ${className}`}>
      <label className={styles.inputLabel}>
        {label}
        {required && <span className={styles.inputRequired}> *</span>}
      </label>

      {value && <img src={baseUrl + "/" + value} className={styles.imageSec} alt="cell" />}

      {/* Hidden native input */}
      <div className={styles.uploadWrapper}>
        <input
          type="file"
          id={inputId}
          name={name}
          accept={accept}
          required={required}
          multiple={multiple}
          onChange={onChange}
          className={styles.hiddenFileInput}
        />
        <label htmlFor={inputId} className={styles.uploadButton}>
          📁 Choose File
        </label>
      </div>
    </div>
  );
};

export default FileUploadField;
