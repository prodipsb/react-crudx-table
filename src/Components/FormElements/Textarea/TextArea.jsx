import React from "react";
import "./Textarea.module.css"; // Import custom styles

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
    <div className={`textarea-group ${className}`}>
      {label && (
        <label className="textarea-label">
          {label}
          {required && <span className="textarea-required">*</span>}
        </label>
      )}
      <textarea
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        rows={rows}
        required={required}
        className="textarea-element"
      />
    </div>
  );
};

export default TextArea;
