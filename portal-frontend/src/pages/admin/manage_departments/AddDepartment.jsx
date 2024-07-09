import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import endPoints from "../../../NetworkRoutes";
import { DatabaseBackupIcon } from "lucide-react";


export default function AddDepartments() {
  const { id } = useParams();
  console.log(id);
  const userData = JSON.parse(localStorage.getItem("User_State"));
  const navigate = useNavigate();
  const [data, setData] = useState({
    department_name: "",
    department_code: "",
  });

  useEffect(() => {
    const getDepartment = async () => {
      try {
        const response = await axios.get(endPoints.getDeparmentById + id, {
          headers: {
            authorization: `Bearer ${userData.token}`,
          },
        });
        console.log(response);
        if (response.status === 200) {
          setData({
            department_name: response.data.data.departmentName,
            department_code: response.data.data.departmentId,
          });
        } else {
          toast.error(response.data.message);
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
    if (id) {
      getDepartment();
    } else {
      setData({ department_name: "", department_code: "" });
    }
  }, []);

  const handleAddDepartment = async () => {
    try {
      const response = await axios.post(
        endPoints.addDepartment,
        {
          departmentName: data.department_name,
          departmentId: data.department_code,
          oldDepId:data.department_code
        },
        {
          headers: {
            authorization: `Bearer ${userData.token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("Department added successfully");
        navigate("/admin/manage-departments/manage-departments");
      } else {
        toast.error(response.data.message);
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
  const handleUpdateDepartment = async () => {
    try {
      console.log(data)
      const response = await axios.post(
        endPoints.updateDepartment,
        {
          departmentName: data.department_name,
          departmentId: data.department_code,
          oldDepId: id,
        },
        {
          headers: {
            authorization: `Bearer ${userData.token}`,
          },
        }
      );
      console.log(response);
      if (response.status === 200) {
        toast.success("Department added successfully");
        navigate("/admin/manage-departments/manage-departments");
      } else {
        toast.error(response.data.message);
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
      <div className='flex justify-center  px-5'>
        <div className='px-4 bg-white my-5 mx-5 rounded-lg sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto'>
          <p className='text-2xl text-center text-black font-semibold'>
            AddDepartments
          </p>
          <div className='grid md:grid-cols-2 gap-2 mt-5'>
            <div>
              <label
                htmlFor='department_name'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Department name
              </label>
              <input
                type='text'
                value={data.department_name}
                onChange={(e) =>
                  setData({ ...data, department_name: e.target.value })
                }
                id='department_name'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='Information Technology'
                required
              />
            </div>
            <div>
              <label
                htmlFor='department_code'
                className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
              >
                Department code
              </label>
              <input
                type='number'
                id='department_code'
                value={data.department_code}
                onChange={(e) =>
                  setData({ ...data, department_code: e.target.value })
                }
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                placeholder='16'
                required
              />
            </div>
          </div>
          <div className='flex justify-center mt-4'>
            <button
              type='button'
              onClick={() => {
                id ? handleUpdateDepartment() : handleAddDepartment();
              }}
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
