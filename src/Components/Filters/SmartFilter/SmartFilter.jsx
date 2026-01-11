import React from "react";
import InputField from "../../FormElements/Input/InputField";
import SelectGroup from "../../FormElements/Select/SelectGroup";
import styles from "./SmartFilter.module.css";
import DateFilter from "../../FormElements/Date/DateFilter";
import DateRangeFilter from "../../FormElements/Date/DateRangeFilter";


export default function SmartFilter({
  filters,
  filterInputFields,
  handleFilterChange,
  onSearch,
  onReset,
}) {
  return (
    <div className={styles.smartFilterWrapper}>

      {/* 🔹 Input Grid */}
      <div className={styles.fieldsGrid}>
        {filterInputFields?.fields?.map((formField, index) => {
          if (formField.type === "dateRange") {
            return (
              <div key={index} className={styles.fullWidthField}>
                <DateRangeFilter
                  name={formField.key}
                  label={formField.label}
                  value={filters[formField.key]}
                  onChange={(value) =>
                    handleFilterChange(value, formField.key)
                  }
                  required={formField.required}
                />
              </div>
            );
          }

          return (
            <div key={index} className={styles.formFieldColumn}>
              {formField.type === "text" && (
                <InputField
                  type="text"
                  name={formField.key}
                  label={formField.label}
                  value={filters[formField.key] ?? ""}
                  placeholder={formField.label}
                  onChange={(e) =>
                    handleFilterChange(e.target.value, formField.key)
                  }
                />
              )}

              {formField.type === "select" && (
                <SelectGroup
                  label={formField.label}
                  name={formField.key}
                  value={filters[formField.key]}
                  placeholder={formField.label}
                  options={formField.options}
                  onChange={(e) =>
                    handleFilterChange(e.target.value, formField.key)
                  }
                />
              )}

              {formField.type === "date" && (
                <DateFilter
                  name={formField.key}
                  label={formField.label}
                  value={filters[formField.key] ?? ""}
                  onChange={(e) =>
                    handleFilterChange(e.target.value, formField.key)
                  }
                />
              )}
            </div>
          );
        })}
      </div>

      {/* 🔍 Action Buttons */}
      <div className={styles.filterActions}>
        {onReset && (
          <button className={styles.resetBtn} onClick={onReset}>
            Reset
          </button>
        )}
        <button className={styles.searchBtn} onClick={onSearch}>
          Search
        </button>
      </div>
    </div>
  );
}
