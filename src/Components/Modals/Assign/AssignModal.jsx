import React from "react";
import SmartButton from "../../Buttons/SmartBtn/SmartBtn";
import CloseBtn from "../../Buttons/CloseBtn/CloseBtn";
import styles from "./AssignModal.module.css";
import CheckboxField from "../../FormElements/Checkbox/CheckboxField";

const AssignModal = ({
  selectedItem,
  isAssignOpen,
  closeAssign,
  handleSubmit,
  formData,
  checkFields,
  setFormData,
}) => {

  React.useEffect(() => {
    if (selectedItem) {
      setFormData({
        id: selectedItem.id,
        name: selectedItem.name,
        permissions: selectedItem.permissions.map(p => p.id),
      });
    }
  }, [selectedItem]);


  const handleCheckboxChange = (e) => {
    const value = parseInt(e.target.value, 10);
    const checked = e.target.checked;
  
    setFormData((prevData) => {
      const existingPermissions = prevData?.permissions || [];
  
      let updatedPermissions;
      if (checked) {
        // Add permission if not already present
        updatedPermissions = [...existingPermissions, value];
      } else {
        // Remove permission
        updatedPermissions = existingPermissions.filter((perm) => perm !== value);
      }
  
      return {
        ...prevData,
        permissions: updatedPermissions,
      };
    });
  };
  

  const permissionIds = formData?.permissions || [];


  return (
    <>
      {isAssignOpen && (
        <div className={styles.editModalOverlay}>
          <div className={styles.editModalBackdrop} onClick={closeAssign} />

          <div className={styles.editModalContainer}>
            <CloseBtn onClick={closeAssign} />

            <form onSubmit={handleSubmit}>
              <h4 className={styles.editModalTitle}>{`Role Name: ${selectedItem?.name}`}</h4>

              <p className={styles.roleModalTitle} >{'Permissions'}</p>

              <div className={styles.assignModalGrid}>
                
                {checkFields.map((checkField, index) => (
                  <div className={styles.editModalField} key={index}>
                    <CheckboxField
                      name={'checkFields'}
                      label={checkField.name}
                      value={checkField.id}
                      checked={permissionIds?.includes(checkField.id)}
                      onChange={handleCheckboxChange}
                    />
                  </div>
                ))}
              </div>

              <div className={styles.editModalFooter}>
                <SmartButton
                  label="Close"
                  type="button"
                  onClick={closeAssign}
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

export default AssignModal;
