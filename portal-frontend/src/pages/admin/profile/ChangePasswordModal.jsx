import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import NetworkRoute from "../../../NetworkRoutes";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
export default function Profile() {
  const userData = JSON.parse(localStorage.getItem("User_State"));
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.newPassword === "" || password.confirmPassword === "") {
      toast.error("Please fill all the fields");
      return;
    }

    if (password.newPassword !== password.confirmPassword) {
      toast.error("Password does not match");
      return;
    }

    try {
      const response = await axios.put(NetworkRoute.changeadminpassword, {
        username: userData.username,
        password: password.newPassword,
      }, {
        headers: {
          Authorization:`Bearer ${userData.token}`
        }
      });
      if (response.data) {
        toast.success("Password changed successfully");
      }
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_BAD_RESPONSE") {
        toast.error(error.response.data.message);
        if (error.response.data.message === "jwt expired") {
          window.localStorage.clear();
          return <Navigate to="/login" />;
        }
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <main>
      <Toaster position="top-right" reverseOrder={true} />
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <div className="flex justify-center">
          <div className="px-4 bg-white my-5 mx-5 rounded-lg sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <p className="text-2xl text-center text-black font-semibold">
              Change Password
            </p>
            <div className="mt-8 flex justify-center">
              <div className="w-1/2">
                <div className="mb-4">
                  <label
                    for="small-input"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    New Password
                  </label>
                  <input
                    type="password"
                    id="small-input"
                    required
                    value={password.newPassword}
                    onChange={(e) =>
                      setPassword({ ...password, newPassword: e.target.value })
                    }
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label
                    for="small-input"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="small-input"
                    required
                    value={password.confirmPassword}
                    onChange={(e) =>
                      setPassword({
                        ...password,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Update Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
