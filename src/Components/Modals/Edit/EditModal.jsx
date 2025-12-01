import React from "react";
import SelectGroup from "../../FormElements/Select/SelectGroup";
import TextArea from "../../FormElements/Textarea/TextArea";
import InputField from "../../FormElements/Input/InputField";
import SmartButton from "../../Buttons/SmartBtn/SmartBtn";
import CloseBtn from "../../Buttons/CloseBtn/CloseBtn";
import styles from "./EditModal.module.css";
import FileUploadField from "../../FormElements/File/FileUploadField";

const EditModal = ({
  formFields,
  isEditOpen,
  closeEdit,
  handleSubmit,
  formData,
  setFormData,
}) => {
  const [errors, setErrors] = React.useState({});

  const handleInputChange = (e) => {
    const { name, value, files, type } = e.target;
    const newValue =
      type === "file" ? (files.length > 1 ? [...files] : files[0]) : value;

    setFormData((prevData) => {
      if (name === "role.id") {
        return {
          ...prevData,
          role: {
            ...prevData?.role,
            id: parseInt(newValue),
          },
        };
      }

      return {
        ...prevData,
        [name]: newValue,
      };
    });
  };

  const validateForm = () => {
    let newErrors = {};

    formFields.fields.forEach((field) => {
      // ❗ Skip validation if field.edit === false AND we are in edit mode
      if (formData?.id && field.edit === false) {
        return; // skip this field
      }

      // validate required fields
      if (field.required) {
        const value = field.key.includes(".")
          ? getValueByKey(formData, field.key)
          : formData[field.key];

        const isEmpty =
          value === undefined ||
          value === null ||
          value === "" ||
          (Array.isArray(value) && value.length === 0);

        if (isEmpty) {
          newErrors[field.key] = `${field.label} is required`;
        }
      }
    });

    return newErrors;
  };

  const getValueByKey = (obj, key) =>
    key.split(".").reduce((o, k) => o?.[k], obj);

  const onSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    handleSubmit(e);
  };

  return (
    <>
      {isEditOpen && (
        <div className={styles.editModalOverlay}>
          <div className={styles.editModalBackdrop} onClick={closeEdit} />

          <div className={styles.editModalContainer}>
            <CloseBtn onClick={closeEdit} />

            <form onSubmit={onSubmit}>
              <h4 className={styles.editModalTitle}>{formFields?.label}</h4>

              <div className={styles.editModalGrid}>
                {formFields?.fields
                  ?.filter((formField) =>
                    formData?.id ? formField.edit !== false : true
                  )
                  ?.map((formField, index) => {
                    const sharedProps = {
                      key: index,
                      name: formField?.key,
                      value: formField?.key.includes(".")
                        ? getValueByKey(formData, formField?.key)
                        : formData?.[formField?.key],
                      placeholder: formField?.label,
                      onChange: handleInputChange,
                      required: formField?.required,
                      label: formField?.label,
                    };

                    return (
                      <div className={styles.editModalField} key={index}>
                        {formField?.type === "text" && (
                          <InputField
                            type="text"
                            {...sharedProps}
                            className={
                              errors[formField.key] ? styles.errorInput : ""
                            }
                          />
                        )}

                        {formField?.type === "select" && (
                          <SelectGroup
                            {...sharedProps}
                            options={formField?.options}
                            className={
                              errors[formField.key] ? styles.errorInput : ""
                            }
                          />
                        )}

                        {formField?.type === "textarea" && (
                          <TextArea
                            rows={formField?.rows}
                            {...sharedProps}
                            className={
                              errors[formField.key] ? styles.errorInput : ""
                            }
                          />
                        )}

                        {formField?.type === "image" && (
                          <FileUploadField
                            {...sharedProps}
                            className={
                              errors[formField.key] ? styles.errorInput : ""
                            }
                          />
                        )}

                        {/* Display error message */}
                        {errors[formField.key] && (
                          <p className={styles.errorText}>
                            {errors[formField.key]}
                          </p>
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
                  onClick={onSubmit}
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
