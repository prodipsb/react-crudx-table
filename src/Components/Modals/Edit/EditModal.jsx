import React from "react";
import SelectGroup from "../../FormElements/Select/SelectGroup";
import TextArea from "../../FormElements/Textarea/TextArea";
import InputField from "../../FormElements/Input/InputField";
import SmartButton from "../../Buttons/SmartBtn/SmartBtn";
import CloseBtn from "../../Buttons/CloseBtn/CloseBtn";
import "./EditModal.module.css";

const EditModal = ({
  editFields,
  isEditOpen,
  closeEdit,
  handleSubmit,
  formData,
  setFormData,
}) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      {isEditOpen && (
        <div className="edit-modal-overlay">
          {/* Backdrop */}
          <div className="edit-modal-backdrop" onClick={closeEdit} />

          {/* Modal Content */}
          <div className="edit-modal-container">
            <CloseBtn onClick={closeEdit} />

            <form onSubmit={handleSubmit}>
              <h4 className="edit-modal-title">{editFields?.label}</h4>

              <div className="edit-modal-grid">
                {editFields?.fields?.map((formField, index) => {
                  const sharedProps = {
                    key: index,
                    name: formField?.key,
                    value: formData?.[formField?.key] ?? "",
                    placeholder: formField?.label,
                    onChange: handleInputChange,
                    required: formField?.required,
                    label: formField?.label,
                  };

                  if (formField?.type === "text") {
                    return (
                      <div className="edit-modal-field" key={index}>
                        <InputField type="text" {...sharedProps} />
                      </div>
                    );
                  }

                  if (formField?.type === "select") {
                    return (
                      <div className="edit-modal-field" key={index}>
                        <SelectGroup
                          {...sharedProps}
                          options={formField?.options}
                        />
                      </div>
                    );
                  }

                  if (formField?.type === "textarea") {
                    return (
                      <div className="edit-modal-field" key={index}>
                        <TextArea rows={formField?.rows} {...sharedProps} />
                      </div>
                    );
                  }

                  return null;
                })}
              </div>

              <div className="edit-modal-footer">
                <SmartButton
                  label="Close"
                  type="button"
                  onClick={closeEdit}
                  isLink={false}
                  className="edit-close-btn"
                />

                <SmartButton
                  label="Save Changes"
                  type="submit"
                  onClick={handleSubmit}
                  isLink={false}
                  className="edit-save-btn"
                />
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditModal;
