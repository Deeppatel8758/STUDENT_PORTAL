import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Sidebar from "../../partials/Sidebar";
import Header from "../../partials/Header";
import { AdminMenuItems } from "../../utils/MenuItems";

import ManageFaculties from "./manage_faculties/ManageFaculties";
import AddFaculties from "./manage_faculties/AddFaculties";
import ManageDepartments from "./manage_departments/ManageDepartments";
import AddDepartments from "./manage_departments/AddDepartment";
import AddStudents from "./manage_students/AddStudents";
import ExportStudentData from "./manage_students/ExportStudentData";
import SemProgression from "./manage_students/SemProgression";
import ManageCertificates from "./manage_certificates/ManageCertificates";
import AddCertificate from "./manage_certificates/AddCertificate";
import ManageDocuments from "./manage_documents/ManageDocuments";
import AddDocument from "./manage_documents/AddDocument";
import IdCardGenerate from "./IdCardGenerate";
import Profile from "./profile/Profile";
import StudentDetails from "./profile/StudentDetails";
import ChangePassword from "./profile/ChangePasswordModal";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userData = JSON.parse(localStorage.getItem("User_State"));
  const navigate = useNavigate();
  useEffect(() => {
    if (userData.role != 1) {
      navigate("/");
    }
  },[]);

  return (
    <div className='flex h-screen overflow-hidden'>
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        MenuItems={AdminMenuItems}
      />

      {/* Content area */}
      <div className='relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
            <Routes>
          <Route
              exact
              path='manage-faculties/manage-faculties'
              element={<ManageFaculties />}
            />
            <Route
              exact
              path='manage-faculties/update-faculty/:id'
              element={<AddFaculties />}
            />
            <Route
              exact
              path='manage-faculties/add-faculties'
              element={<AddFaculties />}
            />
            <Route
              exact
              path='manage-departments/manage-departments'
              element={<ManageDepartments />}
            />
            <Route
              exact
              path='manage-departments/update-department/:id'
              element={<AddDepartments />}
            />
            <Route
              exact
              path='manage-departments/add-department'
              element={<AddDepartments />}
            />
            <Route
              exact
              path='manage-students/add-student'
              element={<AddStudents />}
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
              path='manage-certificates'
              element={<ManageCertificates />}
            />
            <Route exact path='add-certificate' element={<AddCertificate />} />
            <Route
              exact
              path='update-certificate/:id'
              element={<AddCertificate />}
            />
            <Route
              exact
              path='manage-documents'
              element={<ManageDocuments />}
            />
            <Route exact path='add-document' element={<AddDocument />} />
            <Route exact path='update-document/:id' element={<AddDocument />} />
            <Route exact path='id-card-generate' element={<IdCardGenerate />} />
            <Route exact path='profile/profile' element={<Profile />} />
            <Route exact path='/student-details' element={<StudentDetails />} />
            <Route
              path='profile/change-password'
              element={<ChangePassword />}
            />
            
          </Routes>
        </main>
      </div>
    </div>
  );
}
