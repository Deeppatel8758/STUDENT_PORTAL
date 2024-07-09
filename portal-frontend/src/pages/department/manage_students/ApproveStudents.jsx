import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import endPoints from "../../../NetworkRoutes";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Flag } from "lucide-react";
// import LockInLockOut from './LockInLockOut';

export default function ApproveStudents() {
  const [err, setErr] = useState(false);
  const userData = JSON.parse(localStorage.getItem("User_State"));
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [reqType, setReqType] = useState(0);
  const [data, setData] = useState([]);
  const [rejectMsg, setRejectMsg] = useState("");
  //showDialog have three value 0 for hide, 1 for show full detail dialog, 2 for show reject dialog
  const [showDialog, setShowDialog] = useState(0);
  const [dialogData, setDialogData] = useState();

  useEffect(() => {
    handleDisplayData();
  }, []);

  //handle data which is dispalyed in table
  const handleDisplayData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(endPoints.getAllStudentVerificationRequests, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      console.log(res);
      if (res.status === 200) {
        toast.success(res.data.message);
        setData(res.data.data);
        setLoading(false);
        console.log("res is :", res);
        console.log("Data is :", res.data.data);
      }
    } catch (error) {
      setLoading(false);
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

  const handleApprove = async (enroll) => {
    console.log(enroll);
    if (enroll.length != 12) {
      toast.error("Select proper student");
      return;
    }
    try {
      const res = await axios.patch(
        `${endPoints.approveStudentVerificatonReq}/${enroll}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      // console.log(res);
      if (res.status === 200) {
        toast.success("Students Approved Successfully");
        handleDisplayData();
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

  const handleReject = async (enroll) => {
    console.log(enroll);
    if (enroll.length != 12) {
      toast.error("Select proper student");
      return;
    }
    if (rejectMsg.length <= 0) {
      toast.error("Enter complete message");
      return;
    }
    try {
      const res = await axios.patch(
        endPoints.rejectStudent,
        {
          enrollment: enroll,
          comment: rejectMsg,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      // console.log(res);
      if (res.status === 200) {
        toast.success("Students Rejected Successfully");
        handleDisplayData();
        setShowDialog(0);
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
        <div className='px-4 my-5 mx-4 bg-white rounded-lg sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto'>
          <p className='text-2xl text-center text-black font-semibold dark:text-white'>
            Approve Student
          </p>
          <div className='mt-6'>
            {/* Render the JSON data */}
          {data && data.length > 0 ? (
              <div class='relative overflow-x-auto shadow-md sm:rounded-lg h-[450px]'>
                <table class='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
                  <thead class='text-xs text-gray-700 uppercase bg-gray-300 sticky top-0 dark:bg-gray-700 dark:text-gray-400'>
                    <tr>
                      <th scope='col' class='px-6 py-3'>
                        Enrollment No.
                      </th>
                      <th scope='col' class='px-6 py-3'>
                        FirstName
                      </th>
                      <th scope='col' class='px-6 py-3'>
                        MiddleName
                      </th>{" "}
                      <th scope='col' class='px-6 py-3'>
                        LastName
                      </th>
                      <th scope='col' class='px-6 py-3'>
                        Email
                      </th>
                      <th scope='col' class='px-6 py-3'>
                        <span class='sr-only'>show</span>
                      </th>
                      <th scope='col' class='px-6 py-3'>
                        <span class='sr-only'>Approve</span>
                      </th>
                      <th scope='col' class='px-6 py-3'>
                        <span class='sr-only'>Reject</span>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {data.map((item) => (
                      <tr
                        key={item.id}
                        class='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
                      >
                        <th
                          scope='row'
                          class='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                        >
                          {item.enrollment}
                        </th>
                        <td class='px-6 py-4'>{item.firstName}</td>
                        <td class='px-6 py-4'>{item.middleName}</td>
                        <td class='px-6 py-4'>{item.lastName}</td>
                        <td class='px-6 py-4'>{item.email}</td>
                        <td class='px-4 py-4 text-right'>
                          <a
                            href='#'
                            onClick={() => {
                              setShowDialog(1);
                              const {
                                role,
                                password,
                                username,
                                AllowUpdate,
                                LockInDuration,
                                createdAt,
                                updatedAt,
                                ...newObj
                              } = item;
                              setDialogData(newObj);
                            }}
                            class='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                          >
                            show
                          </a>
                        </td>
                        {reqType == 2 && data.status == "PENDING" ? (
                          <>
                            <td colspan='2' class='px-4 py-4 text-right'>
                              PENDING...
                            </td>
                          </>
                        ) : (
                          <>
                            <td class='px-4 py-4 text-right col-span-2'>
                              <button
                                onClick={() => handleApprove(item.username)}
                                class='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                              >
                                Approve
                              </button>
                            </td>
                            <td class='px-4 py-4 text-right'>
                              <button
                                onClick={() => {
                                  setShowDialog(2);
                                  setDialogData(item.username);
                                }}
                                class='font-medium text-red-600 dark:text-blue-500 hover:underline'
                              >
                                Reject
                              </button>
                            </td>
                          </>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              loading && (
                <div className=' h-[20vh] flex justify-center items-center border-b'>
                  {" "}
                  <p>Loading...</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {showDialog != 0 && (
        <div
          id='small-modal'
          tabindex='-1'
          className='fixed flex top-0 left-0 right-0 z-50 w-full h-full overflow-x-hidden md:inset-0 p-4 max-h-full justify-center items-center bg-gray-700/75'
        >
          <div class='relative w-full max-w-md max-h-full '>
            <div class='relative bg-white h-auto rounded-lg shadow dark:bg-gray-900 '>
              <div class='flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600 '>
                <h3 class='text-xl font-medium text-gray-900 dark:text-white'>
                  {showDialog == 1
                    ? `Full details of ${dialogData.enrollment}`
                    : "Enter a reason of rejection"}
                </h3>
                <button
                  type='button'
                  class='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
                  onClick={() => {
                    setShowDialog(0);
                  }}
                >
                  <svg
                    class='w-3 h-3'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 14 14'
                  >
                    <path
                      stroke='currentColor'
                      stroke-linecap='round'
                      stroke-linejoin='round'
                      stroke-width='2'
                      d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                    />
                  </svg>
                  <span class='sr-only'>Close modal</span>
                </button>
              </div>

              {showDialog == 1 ? (
                <div class='p-6 space-y-6  h-96 overflow-y-scroll'>
                  {Object.keys(dialogData).map((key) => (
                    <dl class='max-w-md text-gray-900 divide-y divide-gray-200 dark:text-white dark:divide-gray-700'>
                      <div class='flex flex-col pb-3'>
                        <dt class='mb-1 text-gray-500 md:text-lg dark:text-gray-400'>
                          {key}
                        </dt>
                        <dd class='text-lg font-semibold'>{dialogData[key]}</dd>
                      </div>
                    </dl>
                  ))}
                </div>
              ) : (
                <div class='p-6 space-y-6 '>
                  <textarea
                    id='message'
                    rows='4'
                    class='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='Write reason of rejection here...'
                    onChange={(e) => setRejectMsg(e.target.value)}
                  ></textarea>
                  <button
                    type='button'
                    class='text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2'
                    onClick={() => handleReject(dialogData)}
                  >
                    Reject {dialogData} ?
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
