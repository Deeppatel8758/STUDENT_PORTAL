import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import endPoints from "../../../NetworkRoutes";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//Formerly LockIn/Lockout
export default function () {
  const userData = JSON.parse(window.localStorage.getItem("User_State"));
  const [enroll, setEnroll] = useState();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleData = async () => {
    console.log(enroll);
    if (enroll.length != 12) {
      toast.error("Enter Proper Enrollment");
      return;
    }
    try {
      const res = await axios.get(
        `${endPoints.getStudentDetailByEnrollment}/${enroll}`,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      // console.log(res);
      if (res.status === 200) {
        toast.success("Student Fetched Successfully");
    
        const data = {
          ...res.data.data.studentCollegeDetails,
          ...res.data.data.studentPersonalDetails,
        }
        console.log(data)
        setData(data);
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

  const handleUnlock = async (enroll) => {
    console.log(enroll);
    try {
      const res = await axios.patch(
        `${endPoints.unlockStudent}/${enroll}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      // console.log(res);
      if (res.status === 200) {
        toast.success("Student Unlocked Successfully");
        console.log(res);
        setData(null);
      }
    } catch (error) {
      console.log(error);
      // if (error.code === "ERR_BAD_RESPONSE") {
      //   toast.error(error.response.data.message);
      //   if (error.response.data.message === "jwt expired") {
      //     window.localStorage.clear();
      //     navigate("/login");
      //   }
      // } else {
      //   toast.error(error.message);
      // }
    }
  };
  return (
    <div className='flex justify-center'>
      <Toaster position='top-right' reverseOrder={true} />
      <div className='px-4 my-5 mx-4 bg-white rounded-lg sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto'>
        <p className='text-2xl text-center text-black font-semibold dark:text-white'>
          LockIn/LockOut
        </p>
        <div className='mt-8'>
          <div>
            <label
              htmlFor='visitors'
              className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            >
              Search By Enrollment Number
            </label>
            <input
              type='number'
              id='visitors'
              value={enroll}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
              placeholder='Enter Enrollment No.'
              onChange={(e) => {
                setEnroll(e.target.value);
                setData(null);
              }}
            />
          </div>
          <button
            type='button'
            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 mr-2 mb-2 mt-3'
            onClick={() => handleData()}
          >
            Search
          </button>
        </div>

        {data ? (
          <div className='mt-8 relative overflow-x-auto shadow-md sm:rounded-lg'>
            <table class='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
              <thead class='text-xs text-gray-700 uppercase bg-gray-300 sticky top-0 dark:bg-gray-700 dark:text-gray-400'>
                <tr>
                  <th scope='col' className='px-6 py-3'>
                    EnrollmentNO.
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    FirstName
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    MiddleName
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    LastName
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Email
                  </th>
                  <th scope='col' className='px-6 py-3'>
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.verifiedDepartment == true &&
                  data.registeredStudent == true ?(
                    <tr class='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                      <th
                        scope='row'
                        class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                      >
                        {data.enrollment}
                      </th>
                      <td className='px-6 py-4'>{data.email}</td>
                      <td className='px-6 py-4'>{data.firstName}</td>
                      <td className='px-6 py-4'>{data.middleName}</td>
                      <td className='px-6 py-4'>{data.lastName}</td>
                      <td className='px-6 py-4'>
                        {data.AllowUpdate == false ? (
                          <button
                            data-modal-hide='popup-modal'
                            type='button'
                            className='text-whitstroke-linecapce bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2'
                            onClick={() => handleUnlock(data.enrollment)}
                          >
                            <svg
                              className='w-[20px] h-[20px] mr-2 '
                              aria-hidden='true'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 16 20'
                            >
                              <path
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2.2'
                                d='M11.5 8V4.5a3.5 3.5 0 1 0-7 0V8M8 12v3M2 8h12a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z'
                              />
                            </svg>
                            Locked
                          </button>
                        ) : (
                          <button
                            data-modal-hide='popup-modal'
                            disabled
                            type='button'
                            className='cursor-not-allowed text-gray-900 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 mr-2 mb-2'
                          >
                            <svg
                              className='w-[20px] h-[20px] mr-2 text-gray-800 dark:text-white'
                              aria-hidden='true'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 20 20'
                            >
                              <path
                                stroke='currentColor'
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth='2.2'
                                d='M18.5 8V4.5a3.5 3.5 0 1 0-7 0V8M8 12.167v3M2 8h12a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z'
                              />
                            </svg>
                            Unlocked
                          </button>
                        )}
                      </td>
                    </tr>
                ) :
                  (
                    <div>
                      <tr className="w-full p-4 text-center">
                        Student Not Verified
                      </tr>
                    </div>
                  )
                  
                  
                  }
              </tbody>
            </table>
          </div>
        ) :
          (
            <div>
            {
              loading && <>
              Loading...
              </>
            }
            
            </div>
          )
        }
      </div>
    </div>
  );
}
