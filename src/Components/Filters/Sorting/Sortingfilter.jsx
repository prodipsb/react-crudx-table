import React from "react";
import styles from "./Sorting.module.css";

const SortingFilter = ({
  perPage = 10,
  sortOrder = "desc",
  onPerPageChange,
  onSortChange,
}) => {
  return (
    <div className={styles.filterContainer}>
      
      {/* Per Page Dropdown */}
      <div className={styles.filterItem}>
        <label className={styles.label}>Show</label>
        <select
          value={perPage}
          onChange={(e) => onPerPageChange(Number(e.target.value))}
          className={styles.selectBox}
        >
          {[10, 20, 50, 100].map((item) => (
            <option key={item} value={item}>
              {item} per page
            </option>
          ))}
        </select>
      </div>

      {/* Sort Dropdown */}
      <div className={styles.filterItem}>
        <label className={styles.label}>Sort By</label>
        <select
          value={sortOrder}
          onChange={(e) => onSortChange(e.target.value)}
          className={styles.selectBox}
        >
          <option value="desc">Descending (Z → A)</option>
          <option value="asc">Ascending (A → Z)</option>
        </select>
      </div>

    </div>
  );
};

export default SortingFilter;
