import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import { StudentMenuItems } from "../../utils/MenuItems";

import CertificateRequest from "./CertificateRequest";
import CertificateStatus from "./CertificateStatus";
import Profile from "./profile/Profile";
import ChangePassword from "./profile/ChangePassword";
import UpdateRequest from "./profile/UpdateRequest";

export default function StudentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userData = JSON.parse(localStorage.getItem("User_State"));
  const navigate = useNavigate();
  useEffect(() => {
    if (userData.role != 3) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        MenuItems={StudentMenuItems}
      />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <Routes>
            <Route
              exact
              path="certificate-request"
              element={<CertificateRequest />}
            />
            <Route
              exact
              path="certificate/certificate-request"
              element={<CertificateRequest />}
            />
            <Route
              exact
              path="certificate/certificate-status"
              element={<CertificateStatus />}
            />
            <Route exact path="profile/profile" element={<Profile />} />
            <Route
              exact
              path="profile/change-password"
              element={<ChangePassword />}
            />
            <Route exact path="profile/update" element={<UpdateRequest />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
