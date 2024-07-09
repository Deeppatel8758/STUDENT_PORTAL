import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { FilePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import endPoints from "../../../NetworkRoutes";
import { Trash2, FileEdit } from "lucide-react";

export default function ManageDepartments() {
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("User_State"));
  console.log(userData);
  const [departments, setDepartments] = useState([]);
  useEffect(() => {
    getAllDepartments();
  }, []);

  const getAllDepartments = async () => {
    try {
      const response = await axios.get(endPoints.getAllDepartments, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      console.log(response);
      if (response.status === 200 && response.data.data.length > 0) {
        setDepartments(response.data.data);
      } else {
        toast.error("No departments found");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const deleteDepartment = async (id) => {
    try {
      const response = await axios.delete(endPoints.deleteDepartment + id, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      if (response.status === 200) {
        toast.success(response.data.message);
        getAllDepartments();
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
      }
    }
  };

  return (
    <main>
      <Toaster position='top-right' reverseOrder={true} />
      <div className='flex justify-center  px-5'>
        <div className='px-4 bg-white my-5 mx-5 rounded-lg sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto'>
          <p className='text-2xl text-center text-black font-semibold'>
            Departments Details
          </p>
          <div className="mt-2">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  navigate("/admin/manage-departments/add-department");
                }}
                className="flex gap-2 items-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-4 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                <FilePlus size={20} />
                Add Department
              </button>
            </div>
            <div className="overflow-x-auto flex justify-center">
              <table className="table-md w-full border rounded-2xl">
                {/* head */}
                <thead className="bg-gray-200">
                  <tr>
                    <th></th>
                    <th>Deparment Name</th>
                    <th>Department Code</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {departments &&
                    departments.map((department, index) => {
                      return (
                        <tr key={index}>
                          <th>{index + 1}</th>
                          <td className="text-center">
                            {department.departmentName}
                          </td>
                          <td className="text-center">
                            {department.departmentId}
                          </td>
                          <td className="text-center">
                            <button
                              onClick={() => {
                                navigate(
                                  `/admin/manage-departments/update-department/${department.departmentId}`
                                );
                              }}
                              className="btn btn-square btn-outline"
                            >
                              <FileEdit />
                            </button>
                          </td>
                          <td className="flex justify-center">
                            <button
                              onClick={() =>
                                deleteDepartment(department.departmentId)
                              }
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
