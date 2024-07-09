import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import { DepartmentMenuItems } from "../../utils/MenuItems";

import CertificateRequests from "./manage_requests/CertificateRequests";
import UpdateRequests from "./manage_requests/UpdateRequests";
import AddStudents from "./manage_students/AddStudents";
import ApproveStudents from "./manage_students/ApproveStudents";
import ExportStudentData from "./manage_students/ExportStudentData";
import SemProgression from "./manage_students/SemProgression";
import Profile from "./profile/Profile";
import ChangePassword from "./profile/ChangePasswordModal";

export default function DepartmentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userData = JSON.parse(localStorage.getItem("User_State"));
  const navigate = useNavigate();
  useEffect(() => {
    if (userData.role != 2) {
      navigate("/");
    }
  }, []);
  
  return (
    <div className='flex h-screen overflow-hidden'>
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        MenuItems={DepartmentMenuItems}
      />

      {/* Content area */}
      <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <Routes>
            <Route
              exact
              path='manage-students/add-student'
              element={<AddStudents />}
            />
            <Route
              exact
              path='manage-students/approve-student'
              element={<ApproveStudents />}
            />
            <Route
              exact
              path='manage-students/export-student-data'
              element={<ExportStudentData />}
            />
            <Route
              exact
              path='manage-students/semester-progression'
              element={<SemProgression />}
            />
            <Route
              exact
              path='manage-requests/update-requests'
              element={<UpdateRequests />}
            />
            <Route
              exact
              path='manage-requests/certificate-requests'
              element={<CertificateRequests />}
            />
            <Route exact path='profile/profile' element={<Profile />} />
            <Route
              exact
              path='profile/change-password'
              element={<ChangePassword />}
            />
          </Routes>
        </main>
      </div>
    </div>
  );
}
