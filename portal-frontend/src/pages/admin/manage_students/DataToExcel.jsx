import React from "react";
import * as XLSX from "xlsx";

const App = ({ jsonData }) => {
  const exportToExcel = () => {
    // Create a new workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(jsonData);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Generate the XLSX file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    // Save the file
    saveAsExcelFile(excelBuffer, "data.xlsx");
  };

  const saveAsExcelFile = (buffer, fileName) => {
    const data = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(data, fileName);
  };

  const saveAs = (data, fileName) => {
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(data);
    link.download = fileName;
    link.click();
  };
  return (
    <div className="flex flex-row-reverse m-3 max-sm:justify-center max-sm:items-center ">
      {/* <h1>JSON to Excel Export</h1> */}
      {/* <button >Export to Excel</button> */}
      <button
        type="button"
        onClick={exportToExcel}
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Export to Excel
      </button>
    </div>
  );
};

export default App;
