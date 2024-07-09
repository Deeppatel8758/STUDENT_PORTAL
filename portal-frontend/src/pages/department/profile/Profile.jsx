import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ChangePassword from "./ChangePasswordModal";
import NetworkRoute from "../../../NetworkRoutes";
import login from "../../authentication/Login";
export default function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [userProfile, setUserProfile] = useState({
    name: "",
    email: "",
    contactNumber: "",
    username: "",
  });
  const Navigate = useNavigate();

  const userData = JSON.parse(localStorage.getItem("User_State"));
  useEffect(() => {
    let url = NetworkRoute.adminprofile;
    const accessToken = userData.token;

    // Include the bearer token in the request headers
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    axios
      .get(url, config)
      .then((response) => {
        // Assuming the backend API returns the user's gate profile in the response data
        setUserProfile(response.data.data);
        // console.log(response.data.data);
      })
      .catch((error) => {
        // Handle error if the request fails
        if (error.code === "ERR_BAD_RESPONSE") {
          toast.error(error.response.data.message);
          if (error.response.data.message === "jwt expired") {
            window.localStorage.clear();
            Navigate("../../authentication/Login");
          }
        } else {
          toast.error(error.message);
        }
        console.error("Error fetching user profile:", error);
      });
  }, []);

  const PasswordToggle = () => {
    const [showPassword, setShowPassword] = useState(false);
    const password = "YourPassword"; // Replace with your actual password

    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="password-container">
        <div class="grid grid-cols-2 grid-flow-col ">
          <p>{showPassword ? password : "*".repeat(password.length)}</p>
          <button
            className="toggle-password ml-2"
            onClick={handleTogglePassword}
          >
            {showPassword ? (
              <i className="fa fa-eye-slash" />
            ) : (
              <i className="fa fa-eye" />
            )}
          </button>
        </div>
      </div>
    );
  };

  return (
    <main>
      {isModalOpen && <ChangePassword closeModel={setIsModalOpen} />}
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        <div className="flex justify-center">
          <div className="px-4 bg-white my-5 mx-5 rounded-lg sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <p className="text-2xl text-center text-black font-semibold">
              Profile
            </p>
            <div className="mt-6">
              <div className="flex flex-wrap justify-center">
                <div class="max-w-2xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <div class=" m-3 grid grid-cols-2  grid-flow-col max-sm:flex max-sm:justify-left max-sm:items-center max-sm:text-[15px]">
                    <p className="text-black font-semibold">Name</p>
                    <p className=""> {userProfile.name}</p>
                  </div>
                  <div class=" m-3 grid grid-cols-2 grid-flow-col  max-sm:flex max-sm:justify-left max-sm:items-center max-sm:text-[15px]">
                    <p className=" text-black font-semibold">Email id</p>
                    <p className="">{userProfile.email}</p>
                  </div>
                  <div class=" m-3 grid grid-cols-2 grid-flow-col  max-sm:flex max-sm:justify-left max-sm:items-center max-sm:text-[15px]">
                    <p className=" text-black font-semibold">Phone Number </p>
                    <p>{userProfile.contactNumber}</p>
                  </div>
                  <div class=" m-3 grid grid-cols-2 grid-flow-col  max-sm:flex max-sm:justify-left max-sm:items-center max-sm:text-[15px]">
                    <p className=" text-black font-semibold">Username </p>
                    <p>{userProfile.username}</p>
                  </div>

                  <div class="mt-6 flex justify-center">
                    <button
                      onClick={() => {
                        Navigate("/department/profile/change-password");
                      }}
                      type="button"
                      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-[16px] px-2 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                    >
                      Change Password
                    </button>
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
