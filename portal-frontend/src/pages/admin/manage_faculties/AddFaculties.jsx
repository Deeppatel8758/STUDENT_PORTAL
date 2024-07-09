import axios from "axios";
import React, { useEffect, useState } from "react";
import Selection from "../../../components/test/Selection";
import { Toaster, toast } from "react-hot-toast";
import { useParams, Link } from "react-router-dom";
import endPoints from "../../../NetworkRoutes";

export default function AddFaculties() {
  const userData = JSON.parse(localStorage.getItem("User_State"));
  const { id } = useParams();
  console.log({ id });
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    role: 2,
    contactNumber: "",
    departmentid: 16,
  });

  useEffect(() => {
    const getFaculty = async () => {
      const response = await axios.get(endPoints.getUserById + id, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      console.log(response.data.data);
      setFormData({
        username: response.data.data.username,
        password: "",
        name: response.data.data.name,
        email: response.data.data.email,
        role: 2,
        contactNumber: response.data.data.contactNumber,
        departmentid: response.data.data.departmentid,
      });
    };
    if (id) getFaculty();
    else {
      setFormData({
        username: "",
        password: "",
        name: "",
        email: "",
        role: 2,
        contactNumber: "",
        departmentid: 16,
      });
    }
  }, [id]);

  useEffect(() => {
    const getDepartments = async () => {
      const response = await axios.get(endPoints.getAllDepartments, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      console.log(response.data.data);
      setDepartments(response.data.data);
    };
    getDepartments();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.put(endPoints.updateUser, formData, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      console.log(response);
      toast.success("Faculty Updated Successfully");
      setFormData({
        username: "",
        password: "",
        name: "",
        email: "",
        role: 2,
        contactNumber: "",
        departmentid: 16,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(endPoints.createNewFaculty, formData, {
        headers: {
          Authorization: `Bearer ${userData.token}`,
        },
      });
      console.log(response);
      toast.success("Faculty Added Successfully");
      setFormData({
        username: "",
        password: "",
        name: "",
        email: "",
        role: 2,
        contactNumber: "",
        departmentid: 16,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // add faculties return
  return (
    <main>
      {/* Faculty registarion form  */}

      <div className="flex justify-center Fdr">
        <div className="px-4 bg-white my-5 rounded-lg sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <p className="text-2xl text-center text-black font-semibold">
            Add Faculty
          </p>
          <div className="mt-6">
            <form className="m-7" onSubmit={id ? handleUpdate : handleSubmit}>
              {/* first name and last name */}
              <div class="grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-2  ">
                {/* <input type="text" value={formData.name} onChange={handleChange}  placeholder="Enter Your Name" className="bg-white input input-bordered w-full max-w-xs" /> */}

                <div className="form-control ">
                  <label
                    for="name"
                    class="block text-sm font-medium mb-2 text-gray-900 dark:text-white"
                  >
                    Faculty Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    name="name"
                    id="name"
                    aria-describedby="helper-text-explanation"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="enter your name"
                    required
                  />
                </div>
                <div className="form-control">
                  <label
                    htmlFor="Dept"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Department
                  </label>
                  <select
                    value={formData.departmentid}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        departmentid: e.target.value,
                      });
                    }}
                    id="Dept"
                    className="block w-full p-2 mb-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option>Choose a Department</option>
                    {departments &&
                      departments.map((item) => {
                        return (
                          <option
                            key={item.departmentId}
                            value={item.departmentId}
                          >
                            {item.departmentName}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="form-control">
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Faculty email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                    id="email"
                    aria-describedby="helper-text-explanation"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@flowbite.com"
                    required
                  />
                </div>
                <div className="form-control">
                  <label
                    for="tel"
                    class=" block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    pattern="[0-9]{10}"
                    name="contactNumber"
                    id="email"
                    aria-describedby="helper-text-explanation"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="enter 10 digits phone number"
                    required
                  />
                </div>
                <div className="form-control mt-2">
                  <label
                    for="Username"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    name="username"
                    id="username"
                    aria-describedby="helper-text-explanation"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="enter username"
                    required
                  />
                </div>
                {!id && (
                  <div className="form-control mt-2">
                    <label
                      for="password"
                      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      id="pwd"
                      aria-describedby="helper-text-explanation"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="enter password"
                      required
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-center m-6">
                <button
                  type="submit"
                  class="text-white mt-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Toaster />
    </main>
  );
}
