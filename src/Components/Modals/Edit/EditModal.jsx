import React from "react";
import SelectGroup from "../../FormElements/Select/SelectGroup";
import TextArea from "../../FormElements/Textarea/TextArea";
import InputField from "../../FormElements/Input/InputField";
import SmartButton from "../../Buttons/SmartBtn/SmartBtn";
import CloseBtn from "../../Buttons/CloseBtn/CloseBtn";
import styles from "./EditModal.module.css";

const EditModal = ({
  formFields,
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
        <div className={styles.editModalOverlay}>
          <div className={styles.editModalBackdrop} onClick={closeEdit} />

          <div className={styles.editModalContainer}>
            <CloseBtn onClick={closeEdit} />

            <form onSubmit={handleSubmit}>
              <h4 className={styles.editModalTitle}>{formFields?.label}</h4>

              <div className={styles.editModalGrid}>
                {formFields?.fields?.map((formField, index) => {
                  const sharedProps = {
                    key: index,
                    name: formField?.key,
                    value: formData?.[formField?.key] ?? "",
                    placeholder: formField?.label,
                    onChange: handleInputChange,
                    required: formField?.required,
                    label: formField?.label,
                  };

                  return (
                    <div className={styles.editModalField} key={index}>
                      {formField?.type === "text" && (
                        <InputField type="text" {...sharedProps} />
                      )}
                      {formField?.type === "select" && (
                        <SelectGroup {...sharedProps} options={formField?.options} />
                      )}
                      {formField?.type === "textarea" && (
                        <TextArea rows={formField?.rows} {...sharedProps} />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className={styles.editModalFooter}>
                <SmartButton
                  label="Close"
                  type="button"
                  onClick={closeEdit}
                  isLink={false}
                  className={styles.editCloseBtn}
                />

                <SmartButton
                  label="Save Changes"
                  type="submit"
                  onClick={handleSubmit}
                  isLink={false}
                  className={styles.editSaveBtn}
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
