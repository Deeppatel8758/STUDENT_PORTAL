import React from "react";

const PaginationForStudent = ({
  data,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div>
      {/* Render the data for the current page */}
      <div class="relative overflow-x-auto">
        <div>
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Enrollment
                </th>
                <th scope="col" class="px-6 py-3">
                  email
                </th>
                <th scope="col" class="px-6 py-3">
                  firstName
                </th>
                <th scope="col" class="px-6 py-3">
                  middleName
                </th>
                <th scope="col" class="px-6 py-3">
                  lastName
                </th>

                <th scope="col" class="px-6 py-3">
                  Semester
                </th>
                <th scope="col" class="px-6 py-3">
                  Admission Year
                </th>
                <th scope="col" class="px-6 py-3">
                  Admission Category
                </th>
                <th scope="col" class="px-6 py-3">
                  Caste
                </th>
                <th scope="col" class="px-6 py-3">
                  Gender
                </th>
                <th scope="col" class="px-6 py-3">
                  branch
                </th>
                <th scope="col" class="px-6 py-3">
                  profileUrl
                </th>
                <th scope="col" class="px-6 py-3">
                  signatireUrl
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr
                  key={item.id1}
                  class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.enrollment}
                    {/* {console.log(item)} */}
                  </th>
                  <td class="px-6 py-4">{item.email}</td>
                  <td class="px-6 py-4">{item.firstName}</td>
                  <td class="px-6 py-4">{item.middleName}</td>
                  <td class="px-6 py-4">{item.lastName}</td>
                  <td class="px-6 py-4">{item.semester}</td>
                  <td class="px-6 py-4">{item.admissionYear}</td>
                  <td class="px-6 py-4">{item.admissionCategory}</td>
                  <td class="px-6 py-4">{item.caste}</td>
                  <td class="px-6 py-4">{item.gender}</td>
                  <td class="px-6 py-4">{item.branch}</td>
                  <td class="px-6 py-4 text-right">
                    <a
                      href={item.profileUrl}
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Profile
                    </a>
                  </td>
                  <td class="px-6 py-4 text-right">
                    <a
                      href={item.signatireUrl}
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Signature
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-4">
        {/* Previous button */}
        <button
          className={`${
            currentPage === 1
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-gray-500 text-white"
          } px-4 py-2 m-2 rounded max-sm:text-[15px]`}
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Prev
        </button>

        {/* Display page numbers */}
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            className={`${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-600"
            } px-4 py-2 m-2 rounded max-sm:text-[15px]`}
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
          } px-4 py-2 m-2 rounded max-sm:text-[15px]`}
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginationForStudent;
