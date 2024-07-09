import React from "react";
import { Link } from "react-router-dom";
import Selection from "./Selection";
import Department from "./Department";
import { useState } from "react";
import ManageFaculties from "../../pages/admin/manage_faculties/ManageFaculties";
const Pagination = ({
  data,
  currentPage,
  totalPages,
  onPageChange,
  handleDelete,
}) => {
  const [selectedDepartment, setSelectedDepartment] = useState({
    newDepartment: "",
  });
  const handleChangeselect = async (event) => {
    const newDepartment = event.target.value;
    if (newDepartment == "Choose Department") {
      toast.error("select department");
      return false;
    } else {
      // console.log("evetn",event.target.value)
      // formData.departmentid = event.target.value
      setSelectedDepartment(newDepartment);
    }
    // let departmentId = event.target.value;
    // console.log(selectedDepartment.newDepartment)
    // const  filteredData  =await data.filter((data) => data.departmentid === departmentId);
    // console.log("filterdata ", departmentId);
    // console.log("filterdata ", data.departmentid);
  };

  return (
    <div>
      {/* Render the data for the current page */}
      <div className="flex justify-center">
        <div className="px-4 bg-white my-5 mx-5 rounded-lg sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <p className="text-2xl text-center text-black font-semibold">
            Faculty Details
          </p>
          <div className="mb-3 mt-0 w-full max-w-xs">
            {/* <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a Department</label> */}
            {/* <select
                                        id='countries'
                                        value={selectedDepartment.department}
                                        onChange={handleChangeselect}
                                        // value={formData.departmentid}

                                        class='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                    >
                                        <option selected>Choose Department</option>

                                        {Department.map((department, id) => (
                                            <option key={id} value={department.id}>
                                                {department.name}
                                            </option>
                                        ))}
                                    </select> */}
          </div>
          <div className="mt-6">
            <div class=" h-[350px] overflow-y-scroll">
              {data.length > 0 ? (
                // Render the JSON data
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" class="px-6 py-3">
                          Name
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Email
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Phone Number
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Department
                        </th>
                        <th scope="col" class="px-6 py-3">
                          {/* <span >Edit</span> */}
                        </th>
                        <th scope="col" class="px-6 py-3">
                          <span class="sr-only">Delete</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="overflow-y-scroll">
                      {data.map((item) => (
                        <tr
                          key={item.id1}
                          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <th
                            scope="row"
                            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {item.name}
                            {/* {console.log(item)} */}
                          </th>
                          <td class="px-6 py-4">{item.email}</td>
                          <td class="px-6 py-4">{item.contactNumber}</td>
                          <td class="px-6 py-4">{item.departmentid}</td>

                          <td class="px-6 py-4 text-right">
                            <a
                              href="#"
                              onClick={() => handleDelete(item.id)}
                              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              Delete
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                // Render a loading state or placeholder
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="m-2 flex items-center justify-center space-x-4">
        {/* Previous button */}
        <button
          className={`${
            currentPage === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-gray-500 text-white"
          } px-4 py-2 rounded`}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </button>

        {/* Display page numbers */}
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-600"
            } px-4 py-2 rounded`}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}

        {/* Next button */}
        <button
          className={`${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-gray-500 text-white"
          } px-4 py-2 rounded`}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
