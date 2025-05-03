import React, { useEffect, useState } from "react";
import { AiFillDelete, AiFillEye, AiOutlinePlusCircle } from "react-icons/ai";
import { FaUserSecret } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { VscSettings } from "react-icons/vsc";
import './CrudxTable.module.css';
import ViewModal from "../Components/Modals/View/ViewModal";
import EditModal from "../Components/Modals/Edit/EditModal";
import DeleteModal from "../Components/Modals/Delete/DeleteModal";
import SmartFilter from "../Components/Filters/SmartFilter/SmartFilter";
import SmartButton from "../Components/Buttons/SmartBtn/SmartBtn";

const CrudxTable = ({
  headers,
  editFields,
  filterInputFields,
  handleFilterChange,
  data,
  filters,
  settings,
  viewData,
  editData,
  deleteData,
  addData,
  modalStatus,
  assignRole,
  handleSubmit,
  formData,
  setFormData,
  handleDeleteItem,
}) => {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    setIsEditOpen(modalStatus);
  }, [modalStatus]);

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

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleClick = (name, data) => {
    if (name === "view") {
      setSelectedItem(data); // store selected row data
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
  };

  return (
    <div className="custom-table-wrapper">
      <div className="custom-table-scroll">
        {addData && (
          <div className="add-button-container">
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

        <table className="custom-table">
          <thead>
            <tr>
              {headers?.map((header, index) => (
                <th key={index}>{header?.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((tableData, index) => (
              <tr key={index} className={index % 2 === 0 ? "alt-row" : ""}>
                {headers?.map((header, i) => (
                  <td className="text-cell" key={i}>
                    <p className="capitalize">{tableData[header?.key]}</p>
                    {header?.key === "action" && (
                      <div className="custom-action-buttons">
                        {settings && (
                          <span className="custom-action-icon">
                            <VscSettings
                              size={20}
                              onClick={() => handleClick("settings", tableData)}
                            />
                          </span>
                        )}
                        {viewData && (
                          <span className="custom-action-icon">
                            <AiFillEye
                              size={20}
                              onClick={() => handleClick("view", tableData)}
                            />
                          </span>
                        )}
                        {editData && (
                          <span className="custom-action-icon">
                            <TbEdit
                              size={20}
                              onClick={() => handleClick("edit", tableData)}
                            />
                          </span>
                        )}
                        {deleteData && (
                          <span className="custom-action-icon">
                            <AiFillDelete
                              size={20}
                              onClick={() => handleClick("delete", tableData)}
                            />
                          </span>
                        )}
                        {assignRole && (
                          <span className="custom-action-icon">
                            <FaUserSecret
                              size={20}
                              onClick={() => handleClick("role", tableData)}
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

        {isViewOpen && (
          <ViewModal
            selectedItem={selectedItem}
            editFields={editFields}
            isViewOpen={isViewOpen}
            closeView={closeView}
          />
        )}

        {isEditOpen && (
          <EditModal
            editFields={editFields}
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
