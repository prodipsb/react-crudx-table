import React, { useState, useEffect } from "react";
import styles from "./ViewModal.module.css"; // Import the CSS Module
import CloseBtn from "../../Buttons/CloseBtn/CloseBtn";

const ViewModal = ({ selectedItem, isViewOpen, closeView, formFields }) => {
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
                {formFields?.fields?.map((formField, index) => (
                  <div className={styles.modalField} key={index}>
                    <label className={styles.modalLabel}>
                      {formField?.label}
                    </label>

                    {formField?.type === "image" ? (
                      <img
                        src={
                          formField?.baseUrl +
                          "/" +
                          selectedItem?.[formField?.key]
                        }
                        width={formField?.width}
                        height={formField?.height}
                        className={formField?.class}
                        alt="cell"
                      />
                    ) : (
                      <p className={styles.modalInput}>
                        {typeof selectedItem?.[formField?.key] === "boolean"
                          ? selectedItem?.[formField?.key]
                            ? "Active"
                            : "Inactive"
                          : selectedItem?.[formField?.key]}
                      </p>
                    )}

                  </div>
                ))}
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
