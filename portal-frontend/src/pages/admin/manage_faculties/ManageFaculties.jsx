import React, { useEffect, useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import endPoints from "../../../NetworkRoutes";
import { Link, useNavigate } from "react-router-dom";
export default function ManageFaculties() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("User_State"));
  const [jsonData, setjsonData] = useState([]);
  const [deleteFaculty, setDeleteFaculty] = useState(false);

  useEffect(() => {
    const getStudentData = async () => {
      const response = await axios.get(endPoints.getAllFaculties, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      console.log(response.data.data);
      setjsonData(response.data.data);
    };
    getStudentData();
  }, [deleteFaculty]);

  const handleDelete = async (itemId) => {
    try {
      const response = await axios.delete(
        endPoints.deleteFacultiesData + itemId,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Item deleted successfully.");
        setDeleteFaculty(!deleteFaculty);
      } else {
        console.log("Failed to delete item.");
        toast.error("Failed to delete item.");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }

    getStudentData();
  };

  return (
    <main>
      {/* faculty table details  */}

      <Toaster />
      <div className="h-[400px] overflow-y-scroll">
        <div className="flex justify-center">
          <div className="px-4 bg-white my-5 mx-6 rounded-lg sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <p className="text-2xl text-center text-black font-semibold">
              Faculty Details
            </p>
            <div className="mt-4">
              <div className="flex px-4 justify-end  sm:px-6 lg:px-4 mb-4 w-full max-w-9xl mx-auto">
                <Link to="/admin/manage-faculties/add-faculties">
                <button
                  type="button"
                  className="focus:outline-none m-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Add Faculty
                </button>
                </Link>
              </div>
              {jsonData.length > 0 ? (
                // Render the JSON data
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Phone Number
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Department
                        </th>
                        <th scope="col" className="px-6 py-3">
                          <span className="sr-only">Edit</span>
                        </th>
                        <th scope="col" className="px-6 py-3">
                          <span className="sr-only">Delete</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {jsonData.map((item) => (
                        <tr
                          key={item.id1}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {item.name}
                            {/* {console.log(item)} */}
                          </th>
                          <td className="px-6 py-4">{item.email}</td>
                          <td className="px-6 py-4">{item.contactNumber}</td>
                          <td className="px-6 py-4">{item.departmentid}</td>
                          <td className="px-6 py-4 text-right">
                            <Link
                              to={`/admin/manage-faculties/update-faculty/${item.username}`}
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              Edit
                            </Link>
                          </td>

                          <td className="px-6 py-4 text-right">
                            <div
                              onClick={() => handleDelete(item.username)}
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              Delete
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                // Render a loading state or placeholder
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
