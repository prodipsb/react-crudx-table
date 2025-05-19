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
  const handleInputChange = (e) => {
    const { name, value, files, type } = e.target;
    const newValue =
      type === "file" ? (files.length > 1 ? [...files] : files[0]) : value;
    // setFormData((prevData) => ({
    //   ...prevData,
    //   [name]: name == 'role.id' ? formData?.role?.id = parseInt(newValue) : newValue,
    // }));

    setFormData((prevData) => {
      if (name === "role.id") {
        return {
          ...prevData,
          role: {
            ...prevData.role,
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

  const getValueByKey = (obj, key) =>
    key.split(".").reduce((o, k) => o?.[k], obj);

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
                {formFields?.fields
                  ?.filter((formField) =>
                    formData?.id ? formField.edit !== false : true
                  )
                  ?.map((formField, index) => {
                    const sharedProps = {
                      key: index,
                      name: formField?.key,
                      value: formData?.id
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
                          <InputField type="text" {...sharedProps} />
                        )}
                        {formField?.type === "select" && (
                          <SelectGroup
                            {...sharedProps}
                            options={formField?.options}
                          />
                        )}
                        {formField?.type === "textarea" && (
                          <TextArea rows={formField?.rows} {...sharedProps} />
                        )}
                        {formField?.type === "image" && (
                          <FileUploadField
                            name={formField?.key}
                            label={formField?.label}
                            required={formField?.required}
                            value={formData?.[formField?.key] ?? ""}
                            baseUrl={formField?.baseUrl ?? ""}
                            onChange={handleInputChange}
                            accept={formField?.accept || "*"}
                            multiple={formField?.multiple || false}
                          />
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
