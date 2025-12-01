import React, { useState, useEffect } from "react";
import { AiFillDelete, AiFillEye, AiOutlinePlusCircle } from "react-icons/ai";
import { TbEdit } from "react-icons/tb";
import { VscSettings } from "react-icons/vsc";
import { MdAssignmentAdd } from "react-icons/md";
import { FaFileExport } from "react-icons/fa";

import styles from "./CrudxTable.module.css";

import ViewModal from "../Components/Modals/View/ViewModal";
import EditModal from "../Components/Modals/Edit/EditModal";
import DeleteModal from "../Components/Modals/Delete/DeleteModal";
import SmartFilter from "../Components/Filters/SmartFilter/SmartFilter";
import SmartButton from "../Components/Buttons/SmartBtn/SmartBtn";
import Pagination from "./Pagination/Pagination";
import AssignModal from "../Components/Modals/Assign/AssignModal";
import SortingFilter from "../Components/Filters/Sorting/Sortingfilter";

const iconMap = {
  AiFillDelete,
  AiFillEye,
  AiOutlinePlusCircle,
  TbEdit,
  VscSettings,
  MdAssignmentAdd,
  FaFileExport
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
  assignBtn,
  customBtn,
  exportBtn,
  closeModal,
  formData,
  setFormData,
  checkFields,
  handleSubmit,
  handleDeleteItem,
  handleAssignSubmition,
  fetchData,
  pagination,
}) => {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
      setIsViewOpen(false);
      setIsEditOpen(false);
      setIsAssignOpen(false);
      setIsDeleteOpen(false);
  }, [closeModal]);

  const closeView = () => {
    setIsViewOpen(false);
    setSelectedItem(null);
  };

  const closeEdit = () => {
    setIsEditOpen(false);
    setSelectedItem(null);
    setFormData(null);
  };

  const closeAssign = () => {
    setIsAssignOpen(false);
    setSelectedItem(null);
    setFormData(null);
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
        if (data) {
          setFormData(data);
          setSelectedItem(data);
        }
        break;
      case "delete":
        setIsDeleteOpen(true);
        setSelectedItem(data);
        break;
      case "assign-permissions":
        setIsAssignOpen(true);
        setSelectedItem(data);
        break;
      default:
        break;
    }
  };

  const IconRenderer = ({ Icon, action, tableData, title }) =>
    Icon ? (
      <span className={styles.customActionIcon}>
        <Icon
          size={20}
          title={title || action}
          onClick={() => handleClick(action, tableData)}
        />
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
              icon={<AiOutlinePlusCircle size={15} />}
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

        {exportBtn && (
          <div className={styles.addButtonContainer}>
          <SmartButton
            label={exportBtn.label}
            onClick={() => handleFilterChange(true, "exportData")}
            icon={<FaFileExport size={15} />}
            isLink={false}
            className="bg-red-600"
          />
           </div>
        )}

        <SortingFilter
          perPage={filters?.perPage}
          sortOrder={filters?.sortOrder}
          onPerPageChange={(value) => handleFilterChange(value, "perPage")}
          onSortChange={(value) => handleFilterChange(value, "sortOrder")}
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
                  const getValueByKey = (obj, key) =>
                    key.split(".").reduce((o, k) => o?.[k], obj);
                  const cellValue = getValueByKey(tableData, column?.key);

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
                          {viewBtn && (
                            <div className={styles.iconWithLabel}>
                              <IconRenderer
                                Icon={AiFillEye}
                                action="view"
                                tableData={tableData}
                                title="View"
                              />
                              <span className={styles.iconLabel}>View</span>{" "}
                              {/* 👁️ V */}
                            </div>
                          )}
                          {editBtn && (
                            <div className={styles.iconWithLabel}>
                              <IconRenderer
                                Icon={TbEdit}
                                action="edit"
                                tableData={tableData}
                                title="Edit"
                              />
                              <span className={styles.iconLabel}>Edit</span>{" "}
                              {/* ✏️ E */}
                            </div>
                          )}
                          {deleteBtn && (
                            <div className={styles.iconWithLabel}>
                              <IconRenderer
                                Icon={AiFillDelete}
                                action="delete"
                                tableData={tableData}
                                title="Delete"
                              />
                              <span className={styles.iconLabel}>Del</span>{" "}
                              {/* 🗑️ D */}
                            </div>
                          )}
                          {assignBtn && (
                            <div className={styles.iconWithLabel}>
                              <IconRenderer
                                Icon={MdAssignmentAdd}
                                action="assign-permissions"
                                tableData={tableData}
                                title="Assign Roles"
                              />
                              <span className={styles.iconLabel}>Assign</span>{" "}
                              {/* A */}
                            </div>
                          )}
                          {customBtn?.icon && (
                            <div className={styles.iconWithLabel}>
                              <IconRenderer
                                Icon={
                                  typeof customBtn.icon === "string"
                                    ? iconMap[customBtn.icon]
                                    : customBtn.icon
                                }
                                action={customBtn.action}
                                tableData={tableData}
                              />
                              <span className={styles.iconLabel}>
                                {customBtn.label || "Act"}
                              </span>
                            </div>
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

        {isAssignOpen && (
          <AssignModal
            selectedItem={selectedItem}
            isAssignOpen={isAssignOpen}
            closeAssign={closeAssign}
            handleSubmit={handleAssignSubmition}
            formData={formData}
            checkFields={checkFields}
            setFormData={setFormData}
          />
        )}
      </div>
    </div>
  );
};

export default CrudxTable;
