import React, { useState } from "react";
import DateFilter from "./DateFilter";
import styles from "./DateRangeFilter.module.css";

const PERIODS = [
  { label: "Last 7 Days", value: 7 },
  { label: "Last 30 Days", value: 30 },
  { label: "Last 60 Days", value: 60 },
  { label: "Last 90 Days", value: 90 },
];

const DateRangeFilter = ({
  name,
  label,
  value,
  onChange,
  required,
}) => {
  const [mode, setMode] = useState("periodic"); // periodic | custom
  const [activePeriod, setActivePeriod] = useState(null);

  const handlePeriodClick = (days) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    setActivePeriod(days);

    onChange({
      type: "periodic",
      days,
      startDate: start.toISOString().split("T")[0],
      endDate: end.toISOString().split("T")[0],
    });
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        {label}
        {required && <span>*</span>}
      </label>

      {/* Radio Buttons */}
      <div className={styles.radioGroup}>
        <label>
          <input
            type="radio"
            value="periodic"
            checked={mode === "periodic"}
            onChange={() => setMode("periodic")}
          />
          Periodic
        </label>

        <label>
          <input
            type="radio"
            value="custom"
            checked={mode === "custom"}
            onChange={() => setMode("custom")}
          />
          Custom
        </label>
      </div>

      {/* Periodic Options */}
      {mode === "periodic" && (
        <div className={styles.periodButtons}>
          {PERIODS.map((p) => (
            <button
              key={p.value}
              type="button"
              onClick={() => handlePeriodClick(p.value)}
              className={`${styles.periodBtn} ${
                  activePeriod === p.value ? styles.active : ""
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      {/* Custom Date */}
      {mode === "custom" && (
         <div className={styles.customRow}>
          <DateFilter
            name="startDate"
            label="Start Date"
            value={value?.startDate || ""}
            required={required}
            onChange={(e) =>
              onChange({ ...value, startDate: e.target.value })
            }
          />

          <DateFilter
            name="endDate"
            label="End Date"
            value={value?.endDate || ""}
            required={required}
            onChange={(e) =>
              onChange({ ...value, endDate: e.target.value })
            }
          />
        </div>
      )}
    </div>
  );
};

export default DateRangeFilter;
