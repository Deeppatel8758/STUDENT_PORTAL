import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import endPoints from "../../NetworkRoutes";
import toast, { Toaster } from "react-hot-toast";
import logo from "../../images/ldce-logo.webp";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(3);
  const navigate = useNavigate();

  const getStudentData = async () => {
    try {
      const url = role === 3 ? endPoints.studentlogin : endPoints.adminlogin;
      console.log(role);
      const response = await axios.post(url, {
        username,
        password,
        role,
      });
      console.log(response);
      if (response.data) {
        window.localStorage.setItem(
          "User_State",
          JSON.stringify({
            username: response.data.data.user.username,
            role: response.data.data.user.role,
            token: response.data.data.token,
            department: response.data.data.user.departmentid,
            name: response.data.data.user.name,
          })
        );
        const datas = JSON.parse(window.localStorage.getItem("User_State"));
        console.log(datas);
        if (response.data.data.user.role == "1") {
          navigate("../admin/AdminDashboard");
        } else if (response.data.data.user.role == "2") {
          navigate("../department/DepartmentDashboard");
        } else navigate("../student/StudentDashboard");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    getStudentData();
    let err = "";

    if (username.length === 0) err += "Enter The UserName \n";
    if (password.length === 0) err += "Enter The Password \n";
    if (role.length === 0) err += "Enter The role \n";

    if (err.length > 0) {
      alert(err);
      err = "";
    } else {
      getStudentData();
    }
  };

  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="w-full max-w-md">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4 "
          >
            <div className="flex justify-center mt-5 mb-3">
              <img className="h-16" src={logo} alt="" />
            </div>
            <h2 className="text-3xl text-black font-bold text-center mb-4 pt-2 pb-2">
              Student section portal
            </h2>
            <h2 className="text-3xl font-bold text-center mb-4 pt-2 pb-2">
              Login
            </h2>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="role"
              >
                Role Selection
              </label>
              <select
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="role"
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="3">Student</option>
                <option value="2">Department</option>
                <option value="1">Admin</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
