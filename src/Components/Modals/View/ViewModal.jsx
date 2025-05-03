import React, { useState, useEffect } from "react";
import "./ViewModal.module.css";

const ViewModal = ({ 
  selectedItem, 
  isViewOpen, 
  closeView,
  editFields
}) => {
  const [formData, setFormData] = useState({
    productId: "",
    packType: "",
    banglaShort: "",
    englishShort: "",
    status: "",
  });

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

  return (
    <>
      {isViewOpen && (
        <div className="modal-overlay">
          {/* Backdrop */}
          <div className="modal-backdrop" onClick={closeView} />

          {/* Modal Content */}
          <div className="modal-container">
            {/* Close Button */}
            <button onClick={closeView} className="modal-close">
              <svg className="modal-close-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Form */}
            <form>
              <h4 className="modal-title">
                {editFields?.label}
              </h4>

              <div className="modal-grid">
                {editFields?.fields?.map((formField, index) => (
                  <div className="modal-field" key={index}>
                    <label className="modal-label">
                      {formField?.label}
                    </label>
                    <p>{formData?.[formField?.key] ?? ""}</p>
                  </div>
                ))}
              </div>

              {/* Footer Buttons */}
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={closeView}
                  className="modal-close-btn"
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
