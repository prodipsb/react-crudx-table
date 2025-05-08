import React, { useEffect, useState } from "react";
import { AiFillDelete, AiFillEye, AiOutlinePlusCircle } from "react-icons/ai";
import { FaUserSecret } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { VscSettings } from "react-icons/vsc";
import styles from "./CrudxTable.module.css"; // ✅ Import as styles
import ViewModal from "../Components/Modals/View/ViewModal";
import EditModal from "../Components/Modals/Edit/EditModal";
import DeleteModal from "../Components/Modals/Delete/DeleteModal";
import SmartFilter from "../Components/Filters/SmartFilter/SmartFilter";
import SmartButton from "../Components/Buttons/SmartBtn/SmartBtn";
import Pagination from "./Pagination/Pagination";

const CrudxTable = ({
  columns,
  data,
  addData,
  formFields,
  filters,
  filterInputFields,
  handleFilterChange,
  viewBtn,
  editBtn,
  deleteBtn,
  settingBtn,
  customBtn,
  formData,
  setFormData,
  handleSubmit,
  handleDeleteItem,
  fetchData,
  pagination,
}) => {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const closeView = () => {
    setIsViewOpen(false);
    setSelectedItem(null);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
    setSelectedItem(null);
  };

  const closeDelete = () => {
    setSelectedItem(null);
    setIsDeleteOpen(false);
  };

  const handleClick = (name, data) => {
    if (name === "view") {
      setSelectedItem(data);
      setIsViewOpen(true);
    }
    if (name === "edit") {
      setSelectedItem(data);
      setIsEditOpen(true);
      setFormData(data);
    }
    if (name === "delete") {
      setSelectedItem(data);
      setIsDeleteOpen(true);
    }
    if (name === "role") {
      setSelectedItem(data);
      // Handle assign role logic here if needed
    }
  };

  return (
    <div className={styles.customTableWrapper}>
      <div className={styles.customTableScroll}>
        {addData && (
          <div className={styles.addButtonContainer}>
            <SmartButton
              label={addData.label}
              onClick={() => handleClick("edit")}
              icon={<AiOutlinePlusCircle size={20} />}
              isLink={false}
              className="bg-meta-3"
            />
          </div>
        )}

        <SmartFilter
          filters={filters}
          filterInputFields={filterInputFields}
          handleFilterChange={handleFilterChange}
        />

        <table className={styles.customTable}>
          <thead>
            <tr>
              {columns?.map((column, index) => (
                <th key={index}>{column?.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((tableData, index) => (
              <tr key={index} className={index % 2 === 0 ? styles.altRow : ""}>
                {columns?.map((column, i) => (
                  <td key={i}>
                    {column?.type == 'image' ? (

                    <img src={tableData[column?.key]} width={column?.width} height={column?.height} className={column?.class}/>
                     
                    ) : (

                      <p className={styles.capitalize}>
                      {tableData[column?.key]}
                    </p>

                    )}
                    
                  
                    
                    {column?.key === "action" && (
                      <div className={styles.customActionButtons}>
                        {settingBtn && (
                          <span className={styles.customActionIcon}>
                            <VscSettings
                              size={20}
                              onClick={() => handleClick("settings", tableData)}
                            />
                          </span>
                        )}
                        {viewBtn && (
                          <span className={styles.customActionIcon}>
                            <AiFillEye
                              size={20}
                              onClick={() => handleClick("view", tableData)}
                            />
                          </span>
                        )}
                        {editBtn && (
                          <span className={styles.customActionIcon}>
                            <TbEdit
                              size={20}
                              onClick={() => handleClick("edit", tableData)}
                            />
                          </span>
                        )}
                        {deleteBtn && (
                          <span className={styles.customActionIcon}>
                            <AiFillDelete
                              size={20}
                              onClick={() => handleClick("delete", tableData)}
                            />
                          </span>
                        )}
                        {customBtn && customBtn.icon && (
                          <span className={styles.customActionIcon}>
                            <customBtn.icon
                              size={20}
                              onClick={() =>
                                handleClick(customBtn.action, tableData)
                              }
                            />
                          </span>
                        )}
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {pagination && (
          <Pagination pagination={pagination} fetchData={fetchData} />
        )}

        {isViewOpen && (
          <ViewModal
            selectedItem={selectedItem}
            formFields={formFields}
            isViewOpen={isViewOpen}
            closeView={closeView}
          />
        )}

        {isEditOpen && (
          <EditModal
            formFields={formFields}
            isEditOpen={isEditOpen}
            closeEdit={closeEdit}
            handleSubmit={handleSubmit}
            formData={formData}
            setFormData={setFormData}
          />
        )}

        {isDeleteOpen && (
          <DeleteModal
            selectedItem={selectedItem}
            isDeleteOpen={isDeleteOpen}
            closeDelete={closeDelete}
            onDelete={handleDeleteItem}
          />
        )}
      </div>
    </div>
  );
};

export default CrudxTable;
