import React from "react";
import "./InputField.module.css"; // Import updated CSS

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
    <div className={`input-field-container ${className}`}>
      <label className="input-label">
        {label}
        {required && <span className="input-required"> *</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        className="input-element"
      />
    </div>
  );
};

export default InputField;
