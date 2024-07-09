import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import endPoints from "../../../NetworkRoutes";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SemProgression() {
  const [err, setErr] = useState(false);
  const userData = JSON.parse(localStorage.getItem("User_State"));
  const navigate = useNavigate();

  const [checkAll, setCheckAll] = useState(false);
  const [sem, setSem] = useState(0);
  const [displayData, setDisplayData] = useState([]);

  const handleDisplayData = async () => {
    if (sem == 0) {
      toast.error("Select a semester");
      return;
    }
    try {
      const res = await axios.get(
        `${endPoints.searchStudent}?semester=${sem}`,
         {
           headers: {
            Authorization: `Bearer ${userData.token}`
          }
        }
      );
      // console.log(res);
      if (res.status === 200) {
        toast.success("Students fetched Successfully");
        const studentsData = res.data.data.students;
        // await setDisplayData(res.data.data.students);
        await studentsData.forEach((object) => {
          object.isChecked = false;
        });
        await setDisplayData(studentsData);
        console.log("res is :", res);
        console.log("displayData is :", displayData);
        // console.log(displayData);
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

  const handleCheckAll = async () => {
    await displayData.forEach((object) => {
      object.isChecked = !checkAll;
    });
    await setCheckAll(!checkAll);
    await setDisplayData(displayData);
  };

  const handleSingleChecks = async (index) => {
    await setDisplayData(
      displayData.map((obj, curInd) =>
        curInd === index ? { ...obj, isChecked: !obj.isChecked } : obj
      )
    );
  };
  const handleSemProgess = async () => {
    const uploadData = [];
    await displayData.forEach((object) =>
      object.isChecked === true ? uploadData.push(object.enrollment) : object
    );
    console.log(uploadData);
    if (sem == 0) {
      toast.error("Please select semester");
      return;
    }
    if (uploadData.length === 0) {
      toast.error("Please select atleast one student");
      return;
    }
    try {
      const res = await axios.put(
        endPoints.semesterProgression,
        {
          semester: sem,
          branch: 16 || userData.branch,
          listOfStudent: uploadData,
        },
            {
              headers: {
                Authorization: `Bearer ${userData.token}`
              }
            }
      );
      console.log(res);
      if (res.status === 200) {
        toast.success("Semester progressed successfully");
        setDisplayData([]);
        await handleDisplayData()


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

  useEffect(() => {
    if (err) {
      setErr(false);
      setSem(0);
      setDisplayData([]);
    }
  }, [err, displayData, sem]);
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
                  setDisplayData([]);
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
              {/* </div> */}
              {/* </div> */}
            </div>
            <button
              type="button"
              onClick={handleDisplayData}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-2"
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
                      <th scope="col" className="p-4">
                        <div className="flex items-center">
                          <input
                            id="checkbox-all-search"
                            type="checkbox"
                            checked={checkAll}
                            onChange={handleCheckAll}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        EnrollmentNo.
                      </th>
                      <th scope="col" className="px-6 py-3">
                        FirstName
                      </th>
                      <th scope="col" className="px-6 py-3">
                        MiddleName
                      </th>
                      <th scope="col" className="px-6 py-3">
                        LastName
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Gender
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Email
                      </th>
                    </tr>
                  </thead>

                  {displayData.map((item, index) => {
                    return (
                      <tbody className="px-2">
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index+5}>
                          <td className="w-4 p-4" key={index+1}>
                            <div className="flex items-center">
                              <input
                                id="checkbox-table-search-1"
                                type="checkbox"
                                checked={item.isChecked}
                                onChange={() => handleSingleChecks(index)}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                            </div>
                          </td>
                          <th
                            scope="row"
                            key={item.enrollment}
                            className="px-6 py-4 text-sm font-medium text-left text-gray-900 whitespace-nowrap dark:text-white"

                          >
                            {item.enrollment}
                          </th>
                          <td className="px-6 py-4" key={index+2}>{item.firstName}</td>
                          <td className="px-6 py-4"key={index+3}>{item.middleName}</td>
                          <td className="px-6 py-4"key={index+4}>{item.lastName}</td>
                          <td className="px-6 py-4"key={index+5}>{item.gender}</td>
                          <td className="px-6 py-4" key={index+6}>{item.email}</td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
              </div>

              <div className="flex justify-center m-2">
                <button
                  type="button"
                  // onClick={handleUpload}
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
                  onClick={handleSemProgess}
                >
                  Progress
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
