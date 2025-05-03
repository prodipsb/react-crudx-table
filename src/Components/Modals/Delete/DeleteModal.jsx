import React, { useState, useEffect } from "react";
import styles from "./DeleteModal.module.css";  // Import the CSS Module

const DeleteModal = ({ selectedItem, isDeleteOpen, closeDelete, onDelete }) => {
  const [item, setItem] = useState(null);

  useEffect(() => {
    if (selectedItem) {
      setItem(selectedItem);
    }
  }, [selectedItem]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isDeleteOpen) {
        closeDelete();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isDeleteOpen, closeDelete]);

  const handleDelete = () => {
    if (item?.id) {
      onDelete(item.id);
      closeDelete();
    }
  };

  if (!isDeleteOpen) return null;

  return (
    <div className={styles.modalOverlay} role="dialog" aria-modal="true">
      <div className={styles.modalContainer}>
        <button
          onClick={closeDelete}
          aria-label="Close modal"
          className={styles.closeButton}
        >
          &times;
        </button>

        <div className={styles.modalContent}>
          <div className={styles.iconWrapper}>
            <div className={styles.iconBackground}></div>
            <div className={styles.iconCross}></div>
          </div>

          <h4 className={styles.modalTitle}>Confirm Delete</h4>
          <p className={styles.modalText}>
            Are you sure you want to delete{" "}
            <strong>{item?.englishShort || "this item"}</strong>?
          </p>

          <div className={styles.modalActions}>
            <button type="button" onClick={handleDelete} className={styles.btnDelete}>
              Yes, Delete
            </button>
            <button type="button" onClick={closeDelete} className={styles.btnCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
