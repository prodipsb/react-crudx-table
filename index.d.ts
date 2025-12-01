import React from "react";

export interface Column {
  label: string;
  key: string;
  type?: string;
  width?: number;
  height?: number;
  class?: string;
  baseUrl?: string;
}

export interface PaginationProps {
  currentPage?: number;
  lastPage?: number;
  total?: number;
  perPage?: number;
}

export interface CrudxTableProps {
  columns: Column[];
  data: any[];
  addData?: { label: string };
  formFields?: any[];
  filters?: any;
  filterInputFields?: any;
  handleFilterChange?: (value: any, type?: string) => void;
  viewBtn?: boolean;
  editBtn?: boolean;
  deleteBtn?: boolean;
  assignBtn?: boolean;
  customBtn?: {
    label?: string;
    action?: string;
    icon?: string | React.ComponentType;
  };
  exportBtn?: { label: string };
  modalStatus?: boolean;
  formData?: any;
  setFormData?: (data: any) => void;
  checkFields?: any;
  handleSubmit?: (data: any) => void;
  handleDeleteItem?: (data: any) => void;
  handleAssignSubmition?: (data: any) => void;
  fetchData?: (page?: number) => void;
  pagination?: PaginationProps;
}

declare const CrudxTable: React.FC<CrudxTableProps>;

export default CrudxTable;
