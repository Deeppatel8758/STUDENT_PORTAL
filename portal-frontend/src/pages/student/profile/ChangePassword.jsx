import React, { useEffect, useState } from "react";
import endPoints from "../../../NetworkRoutes";
import axios from "axios";
import { Navigate } from "react-router-dom";
import NetworkRoute from "../../../NetworkRoutes";
import { toast, Toaster } from "react-hot-toast";

export default function ChangePassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const userData = JSON.parse(localStorage.getItem("User_State"));
  console.log(userData);
  const getStudentData = async () => {
    try {
      const response = await axios.get(
        `${endPoints.getStudentDetails}/${userData.username}`,
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      console.log(response.data);
      // Assuming the response.data has the structure as you provided
      const studentCollegeDetails =
        response.data.data.studentData.studentCollegeDetails;
      setEmail(studentCollegeDetails.email);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getStudentData();
  }, []);

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
      const response = await axios.put(
        NetworkRoute.changePassword,
        {
          username: userData.username,
          password: password.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${userData.token}`,
          },
        }
      );
      if (response.data) {
        toast.success("Password changed successfully");
      }
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_BAD_RESPONSE") {
        toast.error(error.response.data.message);
        if (error.response.data.message === "jwt expired") {
          window.localStorage.clear();
          return;
        }
      } else {
        toast.error(error.message);
      }
    }
  };
  return (
    <main>
      <div className="flex justify-center">
        <div className="px-4 bg-white my-5 mx-5 rounded-lg sm:px-6 lg:px-8 py-8 w-full max-w-9xl">
          <section className="bg-gray-50 dark:bg-gray-900 rounded-md">
            <div className="flex flex-col items-center justify-center px-3 py-8 mx-auto md:h-screen lg:py-0">
              <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-6">
                <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Change Password
                </h2>
                <form
                  className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
                  action="#"
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      for="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={email}
                      disabled
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />
                  </div>
                  {/* <div className="email-container">
                    <h2>User Email</h2>
                    {email ? <p>{email}</p> : <p>Loading...</p>}
                  </div> */}
                  <div>
                    <label
                      for="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      value={password.newPassword}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                      onChange={(e) =>
                        setPassword({
                          ...password,
                          newPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label
                      for="confirm-password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Confirm password
                    </label>
                    <input
                      type="password"
                      name="confirm-password"
                      id="confirm-password"
                      value={password.confirmPassword}
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required=""
                      onChange={(e) =>
                        setPassword({
                          ...password,
                          confirmPassword: e.target.value,
                        })
                      }
                    />
                  </div>
                  <button type="submit" className="btn bg-slate-800 w-full">
                    Reset password
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
