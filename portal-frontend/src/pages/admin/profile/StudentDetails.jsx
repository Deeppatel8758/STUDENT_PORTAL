import React, { useEffect, useState } from "react";
// import data from "./data";
import axios from "axios";
import Datatoexel from "../manage_students/Datatoexel";
import { Navigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import Selection from "../../../components/test/Selection";
import { useNavigate } from "react-router-dom";
import PaginationForStudent from "../../../components/test/PaginationForStudent";
import NetworkRoutes from "../../../NetworkRoutes";

export default function StudentDetails() {
  const Navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("User_State"));
  const [jsonData, setjsonData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  let semester, admissionYear, admissionCategory, caste, gender, enrollment;
  // const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedsemester, setSelectedsemester] = useState(null);
  const [selectenrollment, setSelectenrollment] = useState(null);
  const [selectadmissionYear, setSelectadmissionYear] = useState(null);
  const [selectadmissionCategory, setAdmissionCategory] = useState(null);
  const [selectcaste, setSelectcaste] = useState(null);
  const [selctgender, setSelctgender] = useState(null);

  let authToken = userData.token;

  async function getStudentData() {
    const params = {};

    if (selectedsemester) {
      params.semester = selectedsemester;
    }
    if (selectenrollment) {
      params.enrollment = selectenrollment;
    }
    if (selectadmissionYear) {
      params.admissionYear = selectadmissionYear;
    }
    // if (selectedDepartment) {
    //     // params.enrollment = selectedDepartment
    //     console.log(selectedDepartment)
    // }
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
        Authorization: `Bearer ${authToken}`,
      },
      params: params, // Add the parameters to the request
    };

    // console.log(api);
    if (
      selectedsemester != null ||
      selectenrollment != null ||
      selectadmissionYear != null ||
      selectadmissionCategory != null ||
      selectcaste != null ||
      selctgender != null
    ) {
      try {
        const response = await axios.get(api, config);
        // console.log(response.data.data.students);
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

  const handleChange = (event) => {
    setSelectenrollment(event.target.value);
  };
  return (
    <>
      {/* <h1>keyur chotaliya</h1> */}
      {/* menu bar */}
      <Toaster />

      <div className="flex justify-center">
        <div className="px-4 bg-white my-5 mx-5 rounded-lg sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <p className="text-2xl text-center text-black font-semibold">
            {" "}
            Student Details
          </p>
          <div className="mt-6">
            <form class="flex flex-wrap items-center justify-between m-5 ">
              <div className="flex items-center">
                <label for="simple-search" class="sr-only">
                  Search
                </label>
                <div class="relative max-w-sm w-full">
                  <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      class="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 18 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    onChange={handleChange}
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search By Enrolment number"
                  />
                </div>
              </div>
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

          <PaginationForStudent
            data={currentItems}
            currentPage={currentPage}
            totalPages={Math.ceil(jsonData.length / itemsPerPage)}
            onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
          />
          <Datatoexel jsonData={jsonData} />
        </div>
      </div>
    </>
  );
}
