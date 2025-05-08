import React, { useState, useEffect } from "react";
import styles from "./ViewModal.module.css";  // Import the CSS Module

const ViewModal = ({ 
  selectedItem, 
  isViewOpen, 
  closeView,
  formFields
}) => {
  const [formData, setFormData] = useState({
    productId: "",
    packType: "",
    banglaShort: "",
    englishShort: "",
    status: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (selectedItem) {
      setFormData({
        id: selectedItem.id || "",
        productId: selectedItem.productId || "",
        packType: selectedItem.packType || "",
        banglaShort: selectedItem.banglaShort || "",
        englishShort: selectedItem.englishShort || "",
        status: selectedItem.status || "",
      });
    }
  }, [selectedItem]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // Add any save logic here
    console.log("Saved formData:", formData);
    setIsEditing(false); // Disable editing after save
  };

  return (
    <>
      {isViewOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalBackdrop} onClick={closeView} />

          <div className={styles.modalContainer}>
            <button onClick={closeView} className={styles.modalClose}>
              <svg className={styles.modalCloseIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <form>
              <h4 className={styles.modalTitle}>
                {formFields?.label}
              </h4>

              <div className={styles.modalGrid}>
                {formFields?.fields?.map((formField, index) => (
                  <div className={styles.modalField} key={index}>
                    <label className={styles.modalLabel}>
                      {formField?.label}
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name={formField?.key}
                        value={formData?.[formField?.key] ?? ""}
                        onChange={handleChange}
                        className={styles.modalInput}
                      />
                    ) : (
                      <p className={styles.modalInput}>{formData?.[formField?.key] ?? ""}</p>
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
                {isEditing && (
                  <button
                    type="button"
                    onClick={handleSave}
                    className={styles.modalSaveBtn}
                  >
                    Save
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewModal;
