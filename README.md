
# react-crudx-table

`react-crudx-table` is a dynamic CRUD table component for React and Next.js that allows you to easily display, update, and delete data in a table format with minimal setup.

## Installation

To get started, you need to install the package into your React or Next.js project.

### 1. Install via npm:

```bash
npm install react-crudx-table
```

### 2. Or install via yarn:

```bash
yarn add react-crudx-table
```

---

## Usage

Here’s how you can integrate `react-crudx-table` into your project:

### Step 1: Import the Component

In the React or Next.js component where you want to use the table, import `CrudxTable`:

```jsx
import CrudxTable from 'react-crudx-table';
```

### Step 2: Set Up Your Data and Columns

Define the data and columns for the table. The data should be an array of objects, and columns should be an array of objects describing each column in the table.

Example:

```jsx
  const statusData = [
    { label: "Active", value: true },
    { label: "Inactive", value: false },
  ];

  const packageDataTypes = [
    { label: "DATA", value: "DATA" },
    { label: "MINUTE", value: "MINUTE" },
    { label: "COMBO", value: "COMBO" },
    { label: "SMS", value: "SMS" },
  ];


  const formFields = {
    label: "Offer Details",
    fields: [
      { key: "productId", label: "Product ID", type: "text", required: true },
      { key: "packType", label: "Pack Type", type: "select", options: packageDataTypes, required: true },
      { key: "banglaShort", label: "Bangla Short", type: "text", required: true },
      { key: "productImage", label: "Product Image", type:"image", baseUrl: "http://localhost:8000", width:200, height:100,required: true }, // for image add this additional attribute
      { key: "englishShort", label: "English Short", type: "text", required: true },
      { key: "banglaLong", label: "Bangla Long", type: "textarea", rows: 2, required: false },
      { key: "englishLong", label: "English Long", type: "textarea", rows: 2, required: false },
      { key: "status", label: "Status", type: "select", options: statusData, required: true },
    ]
  };

  const filterInputFields = {
    label: "Offer Filters",
    fields: [
      { key: "productId", label: "Filter by Product ID", type: "text", required: false },
      { key: "packType", label: "Select Pack Type", type: "select", options: packageDataTypes, required: false },
      { key: "status", label: "Select Status", type: "select", options: statusData, required: false },
      { key: "startDate", label: "Date Filter", type: "date", required: false },
    ]
  }


  const columns = [
    { key: "productId", label: "Product ID" },
    { key: "packType", label: "Pack Type" },
    { key: "productImage", label: "Product Image", type:"image", width: 200, height: 100, baseUrl: "http://localhost:8000", required: true }, // for image add this additional attribute
    { key: "banglaShort", label: "Bangla Short" },
    { key: "englishShort", label: "English Short" },
    { key: "status", label: "Status" },
    { key: "action", label: "Action" },
  ]
```

### Step 3: Use the `CrudxTable` Component

Now, use the `CrudxTable` component, passing the `headers` and `data` as props:


## Example Usage in a Next.js Project

If you're using Next.js, the steps are almost identical. Here’s an example:

```jsx
import CrudxTable from 'react-crudx-table';
import 'react-crudx-table/dist/styles.css';

const ExamplePage = () => {

  const [offers, setOffers] = useState([]); 

  const [filters, setFilters] = useState({
    productId: '',
    packType: '',
    status: '',
    page: 1,
    pageSize: 10,
  });
  const [formData, setFormData] = useState({
    id: "",
    productId: "",
    packType: "",
    banglaShort: "",
    englishShort: "",
    banglaLong: "",
    englishLong: "",
    status: "",
  });

  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    fetchData(1);
  }, [filters]);

  // Fetch data when filters or page changes
  const fetchData = async (page = 1) => {
    const { productId, packType, status, pageSize } = filters;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API}/offers?page=${page}&pageSize=${pageSize}&productId=${productId}&packType=${packType}&status=${status}`);
    const result = await response.json();
    setOffers(result.offers);
    setPagination(result?.pagination);
  };

  // Handle filter changes
  const handleFilterChange = (value, key) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };


  const statusData = [
    { label: "Active", value: true },
    { label: "Inactive", value: false },
  ];

  const packageDataTypes = [
    { label: "DATA", value: "DATA" },
    { label: "MINUTE", value: "MINUTE" },
    { label: "COMBO", value: "COMBO" },
    { label: "SMS", value: "SMS" },
  ];


  const formFields = {
    label: "Offer Details",
    fields: [
      { key: "productId", label: "Product ID", type: "text", required: true },
      { key: "packType", label: "Pack Type", type: "select", options: packageDataTypes, required: true },
      { key: "banglaShort", label: "Bangla Short", type: "text", required: true },
      { key: "productImage", label: "Product Image", type:"image", baseUrl: "http://localhost:8000", width:200, height:100,required: true }, // for image add this additional attribute
      { key: "englishShort", label: "English Short", type: "text", required: true },
      { key: "banglaLong", label: "Bangla Long", type: "textarea", rows: 2, required: false },
      { key: "englishLong", label: "English Long", type: "textarea", rows: 2, required: false },
      { key: "status", label: "Status", type: "select", options: statusData, required: true },
    ]
  };

  const filterInputFields = {
    label: "Offer Filters",
    fields: [
      { key: "productId", label: "Filter by Product ID", type: "text", required: false },
      { key: "packType", label: "Select Pack Type", type: "select", options: packageDataTypes, required: false },
      { key: "status", label: "Select Status", type: "select", options: statusData, required: false },
      { key: "startDate", label: "Date Filter", type: "date", required: false },
    ]
  }


  const columns = [
    { key: "productId", label: "Product ID" },
    { key: "packType", label: "Pack Type" },
    { key: "productImage", label: "Product Image", type:"image", width: 200, height: 100, baseUrl: "http://localhost:8000", required: true }, // for image add this additional attribute
    { key: "banglaShort", label: "Bangla Short" },
    { key: "englishShort", label: "English Short" },
    { key: "status", label: "Status" },
    { key: "action", label: "Action" },
  ]

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {

        // handle your submit logic

    } catch (error) {
      console.log('my error', error)
    }
  };


  const handleDeleteItem = async(id) => {

    try {
      // handle your crud delete logic
      // window.location.href = "/redirect"
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };

  return (
    <div>
      <h1>Table Data</h1>
        <CrudxTable
          columns={columns}
          data={offers}
          addData={{ label: "Add New" }}
          formFields={formFields}
          filters={filters}
          viewBtn
          editBtn
          deleteBtn
          exportBtn={{label: "Export"}}
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          handleDeleteItem={handleDeleteItem}
          filterInputFields={filterInputFields}
          handleFilterChange={handleFilterChange}
          fetchData={fetchData}
          pagination={pagination}
        />
    </div>
  );
};

export default ExamplePage;
```

---

## Props

| Prop            | Type                | Description                                                                 |
|-----------------|---------------------|-----------------------------------------------------------------------------|
| `header`       | `Array`             | Array of column definitions, each containing `title` and `field`.            |
| `data`          | `Array`             | Array of data objects to populate the table.                                 |
| `editBtn`      | `Boolean`           | If `true`, allows editing of rows (default: `false`).                        |
| `deleteBtn`     | `Boolean`           | If `true`, allows deleting rows (default: `false`).                          |
| `handleSubmit`        | `Function`          | Callback function triggered when a row is edited.                            |
| `handleDeleteItem`      | `Function`          | Callback function triggered when a row is deleted.                          |

---

## Customization

You can style the table by using your own CSS or by using the provided classes. The component can be styled using CSS modules or any other CSS-in-JS solution you're using.

### Example Styling:

```css
/* Example CSS for table */
.react-crudx-table {
  width: 100%;
  border-collapse: collapse;
}

.react-crudx-table th,
.react-crudx-table td {
  padding: 12px;
  text-align: left;
  border: 1px solid #ddd;
}

.react-crudx-table th {
  background-color: #f4f4f4;
}

.react-crudx-table .actions {
  display: flex;
  gap: 10px;
}

.react-crudx-table .action-button {
  background-color: #007bff;
  color: white;
  padding: 6px 12px;
  border: none;
  cursor: pointer;
}
```

---

## How to Handle Server-Side Data

If you're fetching data from an API (e.g., using `fetch` or `axios`), you can update the `data` prop dynamically.

Example using `useEffect`:

```jsx
import { useState, useEffect } from 'react';
import CrudxTable from 'react-crudx-table';

const ExamplePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await fetch('/api/data'); // Replace with your API endpoint
      const result = await response.json();
      setData(result);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Server Data List</h1>
      {loading ? <p>Loading...</p> : <CrudxTable data={data} />}
    </div>
  );
};

export default ExamplePage;
```

---

## Contribution

If you'd like to contribute to this project, feel free to fork the repository and create a pull request. Please ensure that your changes are well-documented and covered by tests.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
