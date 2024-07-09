import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { FileEdit, Trash2, FilePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import endpoint from "../../../NetworkRoutes";

export default function ManageDocuments() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("User_State"));
  const [data, setData] = useState([]);
  const [deleteDocument, setDeleteDocument] = useState(false);

  useEffect(() => {
    const getDocuments = async () => {
      try {
        const response = await axios.get(endpoint.getAllDocuments, {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        });
        if (response.status === 200 && response.data.data.length > 0) {
          setData(response.data.data);
        } else {
          toast.error("No documents found");
        }
        console.log(response);
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
    getDocuments();
  }, [deleteDocument]);

  const handleDelete = async (categoryName) => {
    try {
      const response = await axios.delete(
        endpoint.deleteDocument + categoryName,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        setDeleteDocument(!deleteDocument);
      }
      console.log(response);
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
      <Toaster position="top-right" reverseOrder={true} />
      <div className="flex justify-center px-5">
        <div className="px-4 bg-white my-5 mx-5 rounded-lg sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <p className="text-2xl text-center text-black font-semibold">
            Manage Documents
          </p>
          <div className="mt-2">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  navigate("/admin/add-document");
                }}
                className="flex gap-2 items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-10 mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                <FilePlus size={20} />
                Add Document
              </button>
            </div>
            <div className="overflow-x-auto flex justify-center">
              <table className="w-full table-md border rounded-2xl">
                {/* head */}
                <thead className="bg-gray-200">
                  <tr>
                    <th></th>
                    <th>Document Name</th>
                    <th>Document Type</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}

                  {data &&
                    data.map((item, index) => {
                      return (
                        <tr key={index}>
                          <th>{index + 1}</th>
                          <td className="text-center">{item.categoryname}</td>
                          <td className="text-center">
                            {item.categorydatatype}
                          </td>
                          <td className="text-center">
                            <button
                              onClick={() => {
                                navigate(
                                  `/admin/update-document/${item.categoryid}`
                                );
                              }}
                              className="btn btn-square btn-outline"
                            >
                              <FileEdit />
                            </button>
                          </td>
                          <td className="text-center">
                            <button
                              onClick={() => handleDelete(item.categoryname)}
                              className="btn btn-square btn-outline"
                            >
                              <Trash2 />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
