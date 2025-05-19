import React from "react";
import styles from "./ViewModal.module.css"; // Import the CSS Module
import CloseBtn from "../../Buttons/CloseBtn/CloseBtn";

const ViewModal = ({ selectedItem, isViewOpen, closeView, formFields }) => {
  // ✅ Utility function to handle nested keys like "role.name"
  const getValueByKey = (obj, key) => key.split('.').reduce((o, k) => k == 'id' ? o?.['name'] : o?.[k], obj);

  return (
    <>
      {isViewOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBackdrop} onClick={closeView} />

          <div className={styles.modalContainer}>
            <CloseBtn onClick={closeView} />

            <form>
              <h4 className={styles.modalTitle}>{formFields?.label}</h4>

              <div className={styles.modalGrid}>
                {formFields?.fields
                  ?.filter(formField => formField.edit !== false) // ✅ Skip if edit === false
                  .map((formField, index) => {
                    const cellValue = getValueByKey(selectedItem, formField?.key); // ✅ dynamic nested value

                    return (
                      <div className={styles.modalField} key={index}>
                        <label className={styles.modalLabel}>
                          {formField?.label}
                        </label>

                        {formField?.type === "image" ? (
                          <img
                            src={formField?.baseUrl + "/" + cellValue}
                            width={formField?.width}
                            height={formField?.height}
                            className={formField?.class}
                            alt="cell"
                          />
                        ) : (
                          <p className={styles.modalInput}>
                            {typeof cellValue === "boolean"
                              ? cellValue
                                ? "Active"
                                : "Inactive"
                              : cellValue ?? "N/A"}
                          </p>
                        )}
                      </div>
                    );
                  })}
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  onClick={closeView}
                  className={styles.modalCloseBtn}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewModal;
