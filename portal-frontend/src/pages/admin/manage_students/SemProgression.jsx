import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import endPoints from "../../../NetworkRoutes";
import axios from "axios";
import Department from "../../../components/test/Department";
import { useNavigate } from "react-router-dom";

export default function SemProgression() {
  //handle department change and set value
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [department, setDepartment] = useState([]);
  const navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("User_State"));
  // FETCH DEPARTMENT  FROM BACKEND
  useEffect(() => {
    try {
      axios
        .get(endPoints.getAllDepartmentList, {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        })
        .then((response) => {
          console.log(response.data.data);
          setDepartment(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching options:", error);
          if (error.code === "ERR_BAD_RESPONSE") {
            toast.error(error.response.data.message);
            if (error.response.data.message === "jwt expired") {
              window.localStorage.clear();
              navigate("/login");
            }
          } else {
            toast.error(error.response.data.message);
          }
        });
    } catch {
      window.localStorage.clear();
      navigate("/login");
      console.log("department fetched error");
    }
  }, []);

  const handleSelectChange = (event) => {
    setSelectedDepartment(event.target.value);
    if (event.target.value == "") {
      toast.error("select department");
      return false;
    }
    // console.log(event.target.value)
  };

  const [err, setErr] = useState(false);

  const [sem, setSem] = useState(0);
  const [displayData, setDisplayData] = useState([]);
  useEffect(() => {
    if (err) {
      setErr(false);
      setSem(0);
      setDisplayData([]);
    }
  }, [err]);

  // |<--------------------handle display data-------------------------->
  const handleDisplayData = async () => {
    if (sem == 0) {
      toast.error("Select a semester");
      return;
    }

    if (selectedDepartment == "") {
      toast.error("Select a department");
      return;
    }
    console.log(sem,selectedDepartment)
    // 'http://localhost:3000/routes/admin/students/q?sem=2&department=16'
    // ${endPoints.serchStudentbyDepartment}
    try {
      const res = await axios.get(
        `http://localhost:3000/routes/admin/students/q?sem=${sem}&department=${selectedDepartment}`,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      // console.log(res);
      if (res.status === 200) {
        toast.success("Students fetched Successfully");
        await setDisplayData(res.data.data.students);
        console.log("res is :", res);
        console.log("displayData is :", displayData);
      }
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_BAD_RESPONSE") {
        toast.error(error.response.data.message);
        if (error.response.data.message === "jwt expired") {
          window.localStorage.clear();
          navigate("/login");
        }
      } else {
        toast.error(error.message);
      }
    }
  };

  const [selectAll, setSelectAll] = useState(false);

  const handleSelectAllChange = (event) => {
    const newSelectAll = event.target.checked;
    setSelectAll(newSelectAll);

    const updatedTableData = displayData.map((item) => ({
      ...item,
      checked: newSelectAll,
    }));
    setDisplayData(updatedTableData);
  };

  const handleCheckboxChange = (index) => (event) => {
    const newCheckboxState = event.target.checked;

    const updatedTableData = [...displayData];
    updatedTableData[index].checked = newCheckboxState;
    setDisplayData(updatedTableData);
  };

  //   <----------------------UPLOAD STUDENT FOR SEM PROGRESSION----------------------------->
  //  <----get all select student--->
  const getCheckedEnrollmentNumbers = () => {
    const checkedEnrollmentNumbers = displayData
      .filter((item) => item.checked)
      .map((item) => item.enrollment);

    console.log(checkedEnrollmentNumbers);
    return checkedEnrollmentNumbers;
  };

  const handleUpload = async () => {
    let eligible_students = getCheckedEnrollmentNumbers();
    try {
      const response = await axios.put(
        "http://localhost:3000/routes/admin/semesterProgression",
        {
          semester: sem,
          branch: selectedDepartment,
          listOfStudent: eligible_students,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );

      console.log(response.data.message);
    } catch (error) {
      if (error.code === "ERR_BAD_RESPONSE") {
        toast.error(error.response.data.message);
        if (error.response.data.message === "jwt expired") {
          window.localStorage.clear();
          Navigate("/login");
        }
      } else {
        toast.error(error.response.data.message);
      }
      console.error("Error sending request:", error);
    }
    handleDisplayData();
  };

  // <-------------------------------------------return code----------------------------------------->
  return (
    <main>
      <Toaster position="top-right" reverseOrder={true} />
      <div className="flex justify-center flex-col">
        <div className="px-4 my-5 rounded-lg sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <p className="text-2xl text-center text-black font-semibold dark:text-white">
            Semester Progression
          </p>
          <div className="mt-6">
            {/* <div className="grid grid-cols-2 gap-x-2"> */}
            <div>
              <div className="flex ">
                <div className='className="mb-3 mt-0 w-full max-w-xs'>
                  <label
                    htmlFor="Sem"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Semester
                  </label>
                  <select
                    id="Sem"
                    value={sem}
                    onChange={(e) => {
                      setSem(e.target.value);
                    }}
                    className="block w-72 p-2 mb-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="0">Choose a Semester</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                  </select>
                </div>

                {/*----------- department selection ---------- */}
                <div className="mb-3 mt-0 w-full max-w-xs">
                  <label
                    for="Department"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select a Department
                  </label>
                  <select
                    value={selectedDepartment}
                    onChange={handleSelectChange}
                    className="block w-72 p-2 mb-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Select an Department</option>
                    {department.map((option) => (
                      <option key={option.id} value={option.departmentId}>
                        {option.departmentName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleDisplayData}
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-2"
            >
              Show Data
            </button>
          </div>

          {displayData.length > 0 && (
            <>
              <div className="overflow-x-auto h-96 mt-8 mb-4 rounded-lg shadow-xl">
                <table className="w-full  table-pin-rows text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-gray-700 px-2 uppercase bg-gray-300 sticky top-0 text-xs dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="p-4">
                        <div class="flex items-center">
                          <input
                            id="checkbox-all-search"
                            type="checkbox"
                            checked={selectAll}
                            onChange={handleSelectAllChange}
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                        </div>
                      </th>
                      <th scope="col" class="px-6 py-3">
                        EnrollmentNo.
                      </th>
                      <th scope="col" class="px-6 py-3">
                        FirstName
                      </th>
                      <th scope="col" class="px-6 py-3">
                        MiddleName
                      </th>
                      <th scope="col" class="px-6 py-3">
                        LastName
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Gender
                      </th>
                      <th scope="col" class="px-6 py-3">
                        Email
                      </th>
                    </tr>
                  </thead>

                  {displayData.map((item, index) => {
                    return (
                      <tbody className="px-2">
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 ">
                          <td class="w-4 p-4">
                            <div class="flex items-center">
                              <input
                                id="checkbox-table-search-1"
                                type="checkbox"
                                checked={item.checked}
                                onChange={handleCheckboxChange(index)}
                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                            </div>
                          </td>
                          <th
                            scope="row"
                            key={displayData.enrollment}
                            className="px-6 py-4 text-sm font-medium text-left text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {item.enrollment}
                          </th>
                          <td class="px-6 py-4">{item.firstName}</td>
                          <td class="px-6 py-4">{item.middleName}</td>
                          <td class="px-6 py-4">{item.lastName}</td>
                          <td class="px-6 py-4">{item.gender}</td>
                          <td class="px-6 py-4">{item.email}</td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
              </div>

              <div className="flex justify-center m-2">
                <button
                  type="button"
                  onClick={handleUpload}
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                >
                  Update
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
