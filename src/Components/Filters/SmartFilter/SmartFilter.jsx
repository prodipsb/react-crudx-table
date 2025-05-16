import React from "react";
import InputField from "../../FormElements/Input/InputField";
import SelectGroup from "../../FormElements/Select/SelectGroup";
import TextArea from "../../FormElements/Textarea/TextArea";
import styles from "./SmartFilter.module.css";
import DateFilter from "../../FormElements/Date/DateFilter";

export default function SmartFilter({
  filters,
  filterInputFields,
  handleFilterChange,
}) {
  return (
    <div className={styles.smartFilterWrapper}>
      {filterInputFields?.fields?.map((formField, index) => {
        return (
          <div className={styles.formFieldColumn} key={index}>
            {formField.type === "text" && (
              <InputField
                type={formField.type}
                name={formField?.key}
                label={formField?.label}
                value={filters[formField?.key] ?? ""}
                placeholder={formField?.label}
                onChange={(e) =>
                  handleFilterChange(e.target.value, formField.key)
                }
                required={formField?.required}
              />
            )}

            {formField?.type === "select" && (
              <SelectGroup
                label={formField?.label}
                name={formField?.key}
                value={filters[formField?.key]}
                options={formField?.options}
                onChange={(e) =>
                  handleFilterChange(e.target.value, formField.key)
                }
                placeholder={formField?.label}
                required={formField?.required}
              />
            )}

            {formField.type === "date" && (
              <DateFilter
                type={formField.type}
                name={formField?.key}
                label={formField?.label}
                value={filters[formField?.key] ?? ""}
                placeholder={formField?.label}
                onChange={(e) =>
                  handleFilterChange(e.target.value, formField.key)
                }
                required={formField?.required}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
