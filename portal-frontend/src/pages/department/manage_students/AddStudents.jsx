import React, { useEffect, useState } from "react";
import { read, utils } from "xlsx";
import toast, { Toaster } from "react-hot-toast";
import endPoints from "../../../NetworkRoutes";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Department from "../../../components/test/Department";
import { X } from "lucide-react";

export default function AddStudents() {
  const userData = JSON.parse(localStorage.getItem("User_State"));
  const [data, setData] = useState({
    Semester: 1,
    Department: userData.department,
    file: "",
  });
  const [rawData, setRawData] = useState(null);
  const [jsonData, setJsonData] = useState(null);
  const [err, setErr] = useState(false);
  console.log(userData);
  const navigate = useNavigate();

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    console.log("File changed");

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = read(data, { type: "array" });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = utils.sheet_to_json(worksheet, { header: 1 });
      json.map((item) => {
        if (item.length !== 0) {
          for (let i = 0; i <= 5; i++) {
            if (!(i in item)) {
              item[i] = " ";
            }
          }
        }
      });
      const headers = json[0];
      const dataRows = json.slice(1);

      const jsonData = dataRows.map((row) => {
        const rowData = {};
        row.forEach((value, index) => {
          const header = headers[index];
          rowData[header] = value;
        });
        return rowData;
      });
      const filteredData = Object.keys(jsonData)
        .filter((key) => Object.keys(jsonData[key]).length !== 0)
        .reduce((obj, key) => {
          obj[key] = jsonData[key];
          return obj;
        }, {});

      setJsonData(filteredData);
      setRawData(json);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleClear = () => {
    setJsonData(null);
    setRawData(null);
    setData({ ...data, file: "" });
  };

  const handleUpload = async () => {
    const enrollmentNumbers = {};
    const emailSet = new Set();
    for (const key in jsonData) {
      const record = jsonData[key];
      console.log(emailSet);
      if (record["EnrollmentNo"] in enrollmentNumbers) {
        toast.error("EnrollmentNo. should be unique", {
          id: "duplicateEnroll",
        });
      }
      if (record["EnrollmentNo"] == " ") {
        toast.error("EnrollmentNo should not be empty", {
          id: "enroll",
        });
      }
      if (record["Firstname"] == " ") {
        toast.error("Firstname should not be empty", {
          id: "fname",
        });
      }
      if (record["Email"] == " ") {
        toast.error("Email should not be empty", {
          id: "email",
        });
      } else {
        if (emailSet.has(record["Email"])) {
          toast.error("Email should be unique", {
            id: "duplicate-email",
          });
        } else {
          emailSet.add(record["Email"]);
        }
      }
      if (record["Gender"] == " ") {
        toast.error("Gender should not be empty", {
          id: "gender",
        });
      }
      enrollmentNumbers[record["EnrollmentNo"]] = true;
    }

    const UploadData = [];
    console.log(jsonData[0].FirstName);
    for (const key in jsonData) {
      UploadData.push({
        firstName: jsonData[key].Firstname,
        middleName: jsonData[key].Middlename,
        lastName: jsonData[key].Lastname,
        enrollment: jsonData[key].EnrollmentNo,
        email: jsonData[key].Email,
        gender: jsonData[key].Gender,
      });
    }
    console.log(typeof UploadData);
    console.log(UploadData);
    if (data.Department === "" || data.Semester === "" || data.file === "") {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      const res = await axios.post(
        endPoints.uploadStudentExcel,
        {
          semester: data.Semester,
          branch: data.Department,
          studentExcelData: UploadData,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      console.log(res);
      if (res.status === 200) {
        toast.success("Students Added Successfully");
        setJsonData(null);
        setRawData(null);
        setData({ ...data, file: "" });
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

  return (
    <main>
      <Toaster position='top-right' reverseOrder={true} />
      <div className='flex justify-center'>
        <div className='px-4 my-5 mx-6 bg-white rounded-lg sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto'>
          <p className='text-2xl text-center text-black font-semibold dark:text-white'>
            Add Student
          </p>
          <div className='mt-6'>
            <div className='grid grid-cols-2 gap-x-2'>
              <div>
                <label
                  htmlFor='Sem'
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                >
                  Semester
                </label>
                <select
                  id='Sem'
                  value={data.Semester}
                  disabled
                  onChange={(e) => {
                    setData({ ...data, Semester: e.target.value });
                  }}
                  className='block w-full p-2 mb-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                >
                  <option>Choose a Semester</option>
                  <option value='1'>1</option>
                  <option value='2'>2</option>
                  <option value='3'>3</option>
                  <option value='4'>4</option>
                  <option value='5'>5</option>
                  <option value='6'>6</option>
                  <option value='7'>7</option>
                  <option value='8'>8</option>
                </select>
              </div>
            </div>

            <div>
              <label
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                htmlFor='file_input'
              />
              <div>
                <label
                  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  htmlFor='file_input'
                >
                  Upload file
                </label>
                <div className="flex flex-row">
                  <input
                    value={data.file}
                    onChange={(e) => {
                      handleFileUpload(e);
                      setData({ ...data, file: e.target.value });
                    }}
                    className='p-1 md:w-1/2 w-full self-center text-center text-md  text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
                    id='file_input'
                    type='file'
                  />
                  {data.file && (
                    <button
                      type='button'
                      onClick={handleClear}
                      class='text-white self-center h-8 w-8 ml-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                    >
                      <X />
                    </button>
                  )}
                </div>
                <p
                  className='mt-1 text-sm text-gray-500 dark:text-gray-300'
                  id='file_input_help'
                >
                  Column name must follow :
                  EnrollmentNo,FirstName,LastName,Email,Gender in Excel file.
                </p>
              </div>
            </div>
            {rawData && (
              <>
                <div className='overflow-x-auto h-96 mt-8 mb-4 rounded shadow-xl'>
                  <table className='w-full  table-pin-rows'>
                    <thead className='text-gray-700 px-2 uppercase bg-gray-300 sticky top-0'>
                      <tr>
                        <th className='px-1'></th>
                        {typeof rawData === "object" &&
                          Array.isArray(rawData) &&
                          rawData[0].map((item, idx) => {
                            return (
                              <th
                                key={idx}
                                scope='col'
                                className='px-6 py-3 text-sm text-left py-2'
                              >
                                {item}
                              </th>
                            );
                          })}
                      </tr>
                    </thead>
                    <tbody className='px-2'>
                      {console.log(rawData)}
                      {typeof rawData === "object" &&
                        Array.isArray(rawData) &&
                        rawData.map((item, idx) => {
                          if (idx !== 0) {
                            return (
                              <tr key={idx} className='bg-white border-b '>
                                {typeof item == "object" &&
                                  Array.isArray(item) &&
                                  item.map((value, id) => {
                                    if (id === 0) {
                                      return (
                                        <>
                                          <th
                                            scope='row'
                                            key={id}
                                            className='px-1 py-4 text-sm font-medium text-gray-900 whitespace-nowrap '
                                          >
                                            {idx}
                                          </th>
                                          <th
                                            scope='row'
                                            key={id}
                                            className='px-6 py-4 text-sm font-medium text-left text-gray-900 whitespace-nowrap '
                                          >
                                            {value}
                                          </th>
                                        </>
                                      );
                                    } else {
                                      return (
                                        <td
                                          key={id}
                                          className='px-6 py-4 text-sm'
                                        >
                                          {value}
                                        </td>
                                      );
                                    }
                                  })}
                              </tr>
                            );
                          }
                          return null;
                        })}
                    </tbody>
                  </table>
                </div>
                <div className='flex justify-center'>
                  <button
                    type='button'
                    onClick={handleUpload}
                    class='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                  >
                    Upload
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
