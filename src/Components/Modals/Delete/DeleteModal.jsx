import React, { useState, useEffect } from "react";
import "./DeleteModal.module.css";

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
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-container">
        <button
          onClick={closeDelete}
          aria-label="Close modal"
          className="close-button"
        >
          &times;
        </button>

        <div className="modal-content">
          <div className="icon-wrapper">
            <div className="icon-background"></div>
            <div className="icon-cross"></div>
          </div>

          <h4 className="modal-title">Confirm Delete</h4>
          <p className="modal-text">
            Are you sure you want to delete{" "}
            <strong>{item?.englishShort || "this item"}</strong>?
          </p>

          <div className="modal-actions">
            <button type="button" onClick={handleDelete} className="btn-delete">
              Yes, Delete
            </button>
            <button type="button" onClick={closeDelete} className="btn-cancel">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
