import React, { useEffect, useState } from "react";
import endPoints from "../../../NetworkRoutes";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function UpdateRequests() {
  const [user, setUser] = useState([]);
  const [modeldata, setModeldata] = useState([]);
  const [requestId, setRequestId] = useState();
  const [comment, setComment] = useState("");
  const [documents, setDocuments] = useState([]);
  const [status, setStatus] = useState("PENDING");
  const [tab, settab] = useState(1);
  const userData = JSON.parse(window.localStorage.getItem("User_State"));
  const navigate = useNavigate();

  const fetchUserDocuments = async (requestId) => {
    try {
      const response = await axios.get(
        endPoints.getcertificaterequestdocuments + requestId,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      console.log(response);

      response.data.filesData.map((doc) => {
        console.log('map')
        const uint8Array = new Uint8Array(doc.data.data);

        // Convert the Uint8Array to base64
        const base64Data = btoa(String.fromCharCode.apply(null, uint8Array));
        console.log(base64Data);

        // Create a Data URL for the base64 data
        const dataUrl = `data:image/jpeg;base64,${base64Data}`;
        console.log(dataUrl);
        setDocuments([...documents, { dataUrl, name: doc.name }]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updatestatus = async () => {
    const url = endPoints.updatecertificatestatus;
    try {
      if (status == "REJECTED") {
        const response = await axios.post(
          url,
          {
            requestId,
            status,
            comment,
          },
          {
            headers: {
              Authorization: `Bearer ${userData.token}`,
            },
          }
        );
      }
      if (status == "APPROVED") {
        const response = await axios.post(
          url,
          {
            requestId,
            status,
          },
          {
            headers: {
              Authorization: `Bearer ${userData.token}`,
            },
          }
        );
        console.log(response)
        if (response.status == 200) {
          toast.success("The Request Updated Successfully")
          getcertificaterequests()
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Error In Updating Error")
    }
  };

  const viewstudent = async (enrollment) => {
    try {
      const url = `${endPoints.readstudentdata}${enrollment}`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      let x = response.data.data.studentCollegeDetails;
      console.log(x);
      setModeldata(x);
    } catch (error) {
      console.log(error.message);
    }
  };

  let url = "";
  const getcertificaterequests = async () => {
    try {
      if (tab == 1) {
        url = `${endPoints.getCertificateRequestOnType}/PENDING`;
      }
      if (tab == 2) {
        url = `${endPoints.getCertificateRequestOnType}/APPROVED`;
      }
      if (tab == 3) {
        url = `${endPoints.getCertificateRequestOnType}/REJECTED`;
      }
      const response = await axios.get(url, {
        headers: {
          authorization: `Bearer ${userData.token}`,
        },
      });
      // console.log(response.data.data.rows);
      // console.log(response.data.data)
      let x = response.data.data.certificateRequests.rows;
      console.log(x);

      setUser(x);
      // x.map((y)=>{
      //     console.log(y);
      // })
      // console.log(user);
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
    getcertificaterequests();
  }, [tab]);
  return (
    <main>
      <Toaster position="top-right" reverseOrder={true} />
      <div className="flex justify-center">
        <div className="px-4 bg-white my-5  rounded-lg sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <p className="text-2xl text-center text-black font-semibold">
            Certificate Request
          </p>
          <div className="mt-6">
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              <div className="overflow-x-auto">
                <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 mb-5">
                  <ul className="flex justify-evenly ">
                    <li className="mr-2 ">
                      <div
                        className={`inline-block p-4 border-b-2 rounded-t-lg font-bold text-base ${
                          tab === 1
                            ? "text-blue-600 border-blue-600"
                            : "text-black-500"
                        } dark:text-blue-500 dark:border-blue-500`}
                        onClick={() => {
                          settab(1);
                        }}
                      >
                        Pending
                      </div>
                    </li>
                    <li className="mr-2 ">
                      <div
                        onClick={() => {
                          settab(2);
                        }}
                        className={`inline-block p-4 border-b-2 rounded-t-lg font-bold text-base ${
                          tab === 2
                            ? "text-blue-600 border-blue-600"
                            : "text-black-500"
                        } dark:text-blue-500 dark:border-blue-500`}
                      >
                        Approved
                      </div>
                    </li>
                    <li className="mr-2">
                      <div
                        onClick={() => {
                          settab(3);
                        }}
                        className={`inline-block p-4 border-b-2 rounded-t-lg font-bold text-base ${
                          tab === 3
                            ? "text-blue-600 border-blue-600"
                            : "text-black-500"
                        } dark:text-blue-500 dark:border-blue-500`}
                      >
                        Rejected
                      </div>
                    </li>
                  </ul>
                </div>

                {tab == 1 && (
                  <table className="table-md w-full border rounded-2xl">
                    {/* head */}
                    <thead className="bg-gray-200">
                      <tr>
                        <th>Enrollment</th>
                        <th>Request Id</th>
                        <th>Request Date</th>
                        <th>Certificate Type</th>
                        <th>Profile</th>
                        <th>Documents</th>
                        <th className="">Accept</th>
                        <th className="">Reject</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user &&
                        user.map((item, idx) => {
                          return (
                            <tr key={idx}>
                              <td className="text-center">{item.enrollment}</td>
                              <td className="text-center">{item.requestid}</td>
                              <td className="text-center">
                                {item.requestdate}
                              </td>
                              <td className="text-center">
                                {item.certificatetype}
                              </td>
                              <td className="text-center">
                                <a
                                  href="#my_modal_8"
                                  className="underline"
                                  onClick={() => viewstudent(item.enrollment)}
                                >
                                  View
                                </a>
                              </td>
                              <td className="text-center">
                                <a
                                  href="#my_modal_9"
                                  className="underline"
                                  onClick={() =>
                                    fetchUserDocuments(item.requestid)
                                  }
                                >
                                  View
                                </a>
                              </td>
                              <td className="text-center">
                                <button
                                  type="button"
                                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                  onClick={() => {
                                    setStatus("APPROVED");
                                    setRequestId(item.requestid);
                                     updatestatus();
                                  }}
                                >
                                  Accept
                                </button>
                              </td>
                              <td className="text-center">
                                <button
                                  className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                  onClick={() => {
                                    window.my_modal_4.showModal();
                                    setStatus("REJECTED");
                                    setRequestId(item.requestid);
                                  }}
                                >
                                  Reject
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      {user.length == 0 && (
                        <tr>
                          <td className="text-center">No student found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}
                {tab == 2 && (
                  <table className="table-md w-full border rounded-2xl">
                    {/* head */}
                    <thead className="bg-gray-200">
                      <tr>
                        <th>Enrollment</th>
                        <th>Request Id</th>
                        <th>Request Date</th>
                        <th>Certificate Type</th>
                        <th>Profile</th>
                        <th>Documents</th>

                      </tr>
                    </thead>
                    <tbody>
                      {user &&
                        user.map((item, idx) => {
                          return (
                            <tr key={idx}>
                              <td className="text-center">{item.enrollment}</td>
                              <td className="text-center">{item.requestid}</td>
                              <td className="text-center">
                                {item.requestdate}
                              </td>
                              <td className="text-center">
                                {item.certificatetype}
                              </td>
                              <td className="text-center">
                                <a
                                  href="#my_modal_8"
                                  className="underline"
                                  onClick={() => viewstudent(item.enrollment)}
                                >
                                  View
                                </a>
                              </td>
                              <td className="text-center">
                                <a
                                  href="#my_modal_9"
                                  className="underline"
                                  onClick={() =>
                                    fetchUserDocuments(item.requestid)
                                  }
                                >
                                  View
                                </a>
                              </td>
                            </tr>
                          );
                        })}{" "}
                      {user.length == 0 && (
                        <tr>
                          <td className="text-center">No student found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}

                {tab == 3 && (
                  <table className="table-md w-full border rounded-2xl">
                    {/* head */}
                    <thead className="bg-gray-200">
                      <tr>
                        <th>Enrollment</th>
                        <th>Request Id</th>
                        <th>Request Date</th>
                        <th>Certificate type</th>
                        <th>Profile</th>
                        <th>Documents</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user &&
                        user.map((item, idx) => {
                          return (
                            <tr key={idx}>
                              <td className="text-center">{item.enrollment}</td>
                              <td className="text-center">{item.requestid}</td>
                              <td className="text-center">
                                {item.requestdate}
                              </td>
                              <td className="text-center">
                                {item.certificatetype}
                              </td>
                              <td className="text-center">
                                <a
                                  href="#my_modal_8"
                                  className="underline"
                                  onClick={() => viewstudent(item.enrollment)}
                                >
                                  View
                                </a>
                              </td>
                              <td className="text-center">
                                <a
                                  href="#my_modal_9"
                                  className="underline"
                                  onClick={() =>
                                    fetchUserDocuments(item.requestid)
                                  }
                                >
                                  View
                                </a>
                              </td>
                            </tr>
                          );
                        })}{" "}
                      {user.length == 0 && (
                        <tr>
                          <td className="text-center ">No student found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                )}

                {/* You can open the modal using ID.showModal() method */}

                <dialog id="my_modal_4" className=" modal">
                  <form
                    method="dialog"
                    className="modal-box w-11/12 max-w-2xl bg-white"
                  >
                    <h3 className="font-bold text-lg pb-4">
                      Enter the reason for Rejecting
                    </h3>
                    <input
                      type="text"
                      className="border-2"
                      value={comment}
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                    ></input>
                    <div className="modal-action">
                      {/* if there is a button, it will close the modal */}
                      <button
                        className="btn"
                        onClick={() => {
                          updatestatus();
                        }}
                      >
                        Submit
                      </button>
                      <button className="btn">Close</button>
                    </div>
                  </form>
                </dialog>

                <div className="modal" id="my_modal_9">
                  <div className="modal-box bg-white">
                    <div className="modal-action">
                      <a
                        onClick={() => {
                          setDocuments([]);
                        }}
                        href="#"
                        className="btn bg-white text-lg text-black -mt-10 hover:bg-white"
                      >
                        X
                      </a>
                    </div>
                    {documents &&
                      documents.map((document, idx) => (
                        <div key={idx}>
                          <p className="mb-2 text-center">{document.name}</p>
                          {/* Assuming the document is a PDF, you can use an embedded PDF viewer */}
                          <img
                            src={document.dataUrl}
                            width="100%"
                            height="500px"
                          />
                        </div>
                      ))}
                  </div>
                </div>

                <div className="modal" id="my_modal_8">
                  <div className="modal-box bg-white">
                    <div className="overflow-x-auto">
                      <h1 className="text-center  font-bold mb-4">
                        Student Profile
                      </h1>
                      <table className="table border border-solid rounded-2xl">
                        <tbody>
                          {/* FirstName */}
                          <tr>
                            <td className="header-cell">FirstName :</td>
                            <td className="value-cell">
                              {modeldata.firstName}
                            </td>
                          </tr>

                          {/* MiddleName */}
                          <tr>
                            <td className="header-cell">MiddleName :</td>
                            <td className="value-cell">
                              {modeldata.middleName}
                            </td>
                          </tr>

                          {/* LastName */}
                          <tr>
                            <td className="header-cell">LastName :</td>
                            <td className="value-cell">{modeldata.lastName}</td>
                          </tr>

                          {/* Semester */}
                          <tr>
                            <td className="header-cell">Semester :</td>
                            <td className="value-cell">{modeldata.semester}</td>
                          </tr>

                          {/* Enrollment */}
                          <tr>
                            <td className="header-cell">Enrollment :</td>
                            <td className="value-cell">
                              {modeldata.enrollment}
                            </td>
                          </tr>

                          {/* Email */}
                          <tr>
                            <td className="header-cell">Email :</td>
                            <td className="value-cell">{modeldata.email}</td>
                          </tr>
                          <tr>
                            <td className="header-cell">Gender :</td>
                            <td className="value-cell">{modeldata.gender}</td>
                          </tr>
                          <tr>
                            <td className="header-cell">Religion :</td>
                            <td className="value-cell">{modeldata.religion}</td>
                          </tr>
                          <tr>
                            <td className="header-cell">Caste :</td>
                            <td className="value-cell">{modeldata.caste}</td>
                          </tr>
                          <tr>
                            <td className="header-cell">
                              Admission Category :
                            </td>
                            <td className="value-cell">
                              {modeldata.admissionCategory}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="modal-action">
                      <a href="#" className="btn">
                        Close
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
              
      </div>
    </main>
  );
}
