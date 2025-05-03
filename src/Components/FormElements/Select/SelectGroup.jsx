import React from "react";
import "./SelectGroup.module.css"; // Import custom styles

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
    <div className="select-group-container">
      <label className="select-label">
        {label}
        {required && <span className="select-required"> *</span>}
      </label>

      <div className="select-wrapper">
        <select
          name={name}
          value={value ?? ""}
          onChange={onChange}
          className="select-element"
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
