import React, { useEffect, useState } from "react";
// import data from './data';
import axios from "axios";
import Datatoexcel from "./Datatoexcel";
import { Navigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import Selection from "../../../components/test/Selection";
import { useNavigate } from "react-router-dom";
// import PaginationForStudent from '../../../components/test/PaginationForStudent';
import NetworkRoutes from "../../../NetworkRoutes";

export default function ExportStudentData() {
  const Navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("User_State"));
  const [jsonData, setjsonData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  let semester, admissionYear, admissionCategory, caste, gender, enrollment;
  // const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedsemester, setSelectedsemester] = useState(null);
  const [selectadmissionYear, setSelectadmissionYear] = useState(null);
  const [selectadmissionCategory, setAdmissionCategory] = useState(null);
  const [selectcaste, setSelectcaste] = useState(null);
  const [selctgender, setSelctgender] = useState(null);

  // let authToken = userData.token;

  async function getStudentData() {
    const params = {};

    if (selectedsemester) {
      params.semester = selectedsemester;
    }
    if (selectadmissionYear) {
      params.admissionYear = selectadmissionYear;
    }
    if (selectadmissionCategory) {
      params.admissionCategory = selectadmissionCategory;
    }
    if (selectcaste) {
      params.caste = selectcaste;
    }
    if (selctgender) {
      params.gender = selctgender;
    }
    // const apiUrl = Networkroutes.fetchFacultiesData
    const api = NetworkRoutes.searchStudent;
    const config = {
      headers: {
        Authorization: `Bearer ${userData.token}`,
      },
      params: params, // Add the parameters to the request
    };

    // console.log(api);
    if (
      selectedsemester != null ||
      selectadmissionYear != null ||
      selectadmissionCategory != null ||
      selectcaste != null ||
      selctgender != null
    ) {
      try {
        const response = await axios.get(api, config);
        console.log(response.data.data.students);
        setjsonData(response.data.data.students);
      } catch (error) {
        console.log(error);
        // toast.error(error.response.data.message)
        if (error.code === "ERR_BAD_RESPONSE") {
          toast.error(error.response.data.message);
          if (error.response.data.message === "jwt expired") {
            window.localStorage.clear();
            Navigate("/login");
          }
        } else {
          toast.error(error.message);
        }
      }
    } else {
      toast.error("Select atleast one field");
    }
  }
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = jsonData.slice(indexOfFirstItem, indexOfLastItem);

  // Callback function to receive the value from the child component

  const handleSemesterChange = (newDepartment) => {
    if (newDepartment == "Choose Semester") {
      setSelectedsemester(null);
    } else setSelectedsemester(newDepartment);
  };

  const handleAdmissionYearChange = (newDepartment) => {
    if (newDepartment == "Choose Admission year") {
      setSelectadmissionYear(null);
    } else setSelectadmissionYear(newDepartment);
  };
  const handleCasteChange = (newDepartment) => {
    if (newDepartment == "Choose Caste") setSelectcaste(null);
    else setSelectcaste(newDepartment);
  };
  const handleGenderChange = (newDepartment) => {
    if (newDepartment == "Choose Gender") setSelctgender(null);
    else setSelctgender(newDepartment);
  };
  const handleAdmissionCatecoryChange = (newDepartment) => {
    if (newDepartment == "Choose Admission Category")
      setAdmissionCategory(null);
    else setAdmissionCategory(newDepartment);
  };

  const [inputValue, setInputValue] = useState("");

  return (
    <>
      {/* <h1>keyur chotaliya</h1> */}
      {/* menu bar */}
      <Toaster />

      <div className="flex justify-center">
        <div className="px-4 bg-white my-5 mx-5 rounded-lg sm:px-6 lg:px-8 py-8 w-full max-w-9xl ">
          <p className="text-2xl text-center text-black font-semibold">
            {" "}
            Student Details
          </p>
          <div className="mt-6">
            <form class="flex flex-wrap items-center justify-end m-5 ">
              <button
                type="button"
                onClick={getStudentData}
                class="text-white m-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Search
              </button>
            </form>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 place-items-center  ">
              <Selection
                value={"Semester"}
                onDepartmentChange={handleSemesterChange}
              />

              <Selection
                value={"Admission year"}
                onDepartmentChange={handleAdmissionYearChange}
              />
              <Selection
                value={"Caste"}
                onDepartmentChange={handleCasteChange}
              />
              <Selection
                value={"Gender"}
                onDepartmentChange={handleGenderChange}
              />
              <Selection
                value={"Admission Category"}
                onDepartmentChange={handleAdmissionCatecoryChange}
              />
            </div>
          </div>

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
                  {jsonData.map((item) => (
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
                          class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                        >
                          Profile
                        </a>
                      </td>
                      <td class="px-6 py-4 text-right">
                        <a
                          href={item.signatireUrl}
                          class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                        >
                          Signature
                        </a>
                      </td>
                    </tr>
                  ))}
                  {jsonData.length == 0 && (
                    <tr>
                      <td colSpan="13" class="px-6 py-4 text-center">
                        No Data Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* <PaginationForStudent
                        data={currentItems}
                        currentPage={currentPage}
                        totalPages={Math.ceil(jsonData.length / itemsPerPage)}
                        onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
                    /> */}

          <Datatoexcel jsonData={jsonData} />
        </div>
      </div>
    </>
  );
}
