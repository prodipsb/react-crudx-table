import React, { useState } from "react";
import { AiFillDelete, AiFillEye, AiOutlinePlusCircle } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";
import { VscSettings } from "react-icons/vsc";

import styles from "./CrudxTable.module.css";

import ViewModal from "../Components/Modals/View/ViewModal";
import EditModal from "../Components/Modals/Edit/EditModal";
import DeleteModal from "../Components/Modals/Delete/DeleteModal";
import SmartFilter from "../Components/Filters/SmartFilter/SmartFilter";
import SmartButton from "../Components/Buttons/SmartBtn/SmartBtn";
import Pagination from "./Pagination/Pagination";

// Optional: map string keys to icons if customBtn.icon is a string
const iconMap = {
  AiFillDelete,
  AiFillEye,
  AiOutlinePlusCircle,
  TbEdit,
  VscSettings,
};

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
    setFormData(null)
  };

  const closeDelete = () => {
    setSelectedItem(null);
    setIsDeleteOpen(false);
  };

  const handleClick = (name, data = null) => {
    setSelectedItem(data);
    switch (name) {
      case "view":
        setIsViewOpen(true);
        setSelectedItem(data);
        break;
      case "edit":
        setIsEditOpen(true);
        if (data){ 
          setFormData(data); 
          setSelectedItem(data);
        }
        break;
      case "delete":
        setIsDeleteOpen(true);
        setSelectedItem(data);
        break;
      case "role":
        // Add role handling logic here
        break;
      default:
        break;
    }
  };

  const IconRenderer = ({ Icon, action, tableData }) =>
    Icon ? (
      <span className={styles.customActionIcon}>
        <Icon size={20} onClick={() => handleClick(action, tableData)} />
      </span>
    ) : null;

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
            {data?.map((tableData, rowIndex) => (
              <tr
                key={rowIndex}
                className={rowIndex % 2 === 0 ? styles.altRow : ""}
              >
                {columns?.map((column, colIndex) => {
                  const cellValue = tableData?.[column?.key];

                  return (
                    <td key={colIndex}>
                      {column?.type === "image" ? (
                        <img
                          src={column.baseUrl + "/" + cellValue}
                          width={column?.width}
                          height={column?.height}
                          className={column?.class}
                          alt="cell"
                        />
                      ) : (
                        <p className={styles.capitalize}>
                          {typeof cellValue === "boolean"
                            ? cellValue
                              ? "Active"
                              : "Inactive"
                            : cellValue}
                        </p>
                      )}

                      {column?.key === "action" && (
                        <div className={styles.customActionButtons}>
                          {settingBtn && (
                            <IconRenderer
                              Icon={VscSettings}
                              action="settings"
                              tableData={tableData}
                            />
                          )}
                          {viewBtn && (
                            <IconRenderer
                              Icon={AiFillEye}
                              action="view"
                              tableData={tableData}
                            />
                          )}
                          {editBtn && (
                            <IconRenderer
                              Icon={TbEdit}
                              action="edit"
                              tableData={tableData}
                            />
                          )}
                          {deleteBtn && (
                            <IconRenderer
                              Icon={AiFillDelete}
                              action="delete"
                              tableData={tableData}
                            />
                          )}
                          {customBtn?.icon && (
                            <IconRenderer
                              Icon={
                                typeof customBtn.icon === "string"
                                  ? iconMap[customBtn.icon]
                                  : customBtn.icon
                              }
                              action={customBtn.action}
                              tableData={tableData}
                            />
                          )}
                        </div>
                      )}
                    </td>
                  );
                })}
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
