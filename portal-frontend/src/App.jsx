import React, { useEffect } from "react";
import { Routes, Route, useLocation, Router } from "react-router-dom";

import "./css/style.css";

//Authentication page
import Login from "./pages/authentication/Login";

// Import pages
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";

import AdminDashboard from "./pages/admin/AdminDashboard";
import DepartmentDashboard from "./pages/department/DepartmentDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";

// Student dashboard imports
import CertificateRequest from "./pages/student/CertificateRequest";
import StudentProfile from "./pages/student/profile/Profile";
import StudentUpdateRequest from "./pages/student/profile/UpdateRequest";
import CertificateStatus from "./pages/student/CertificateStatus";

// Department dashboard imports
import DepartmentCertificateRequests from "./pages/department/manage_requests/CertificateRequests";
import DepartmentUpdateRequests from "./pages/department/manage_requests/UpdateRequests";
import DepartmentAddStudents from "./pages/department/manage_students/AddStudents";
import DepartmentApproveStudents from "./pages/department/manage_students/ApproveStudents";
import DepartmentExportStudentData from "./pages/department/manage_students/ExportStudentData";
import DepartmentSemProgression from "./pages/department/manage_students/SemProgression";
import DepartmentProfile from "./pages/department/profile/Profile";
import ChangePasswordModal from "./pages/department/profile/ChangePasswordModal";

// Admin dashboard imports
import AdminManageFaculties from "./pages/admin/manage_faculties/ManageFaculties";
import AdminAddFaculties from "./pages/admin/manage_faculties/AddFaculties";
import AdminManageDepartments from "./pages/admin/manage_departments/ManageDepartments";
import AdminAddDepartments from "./pages/admin/manage_departments/AddDepartment";
import AdminAddStudents from "./pages/admin/manage_students/AddStudents";
import AdminExportStudentData from "./pages/admin/manage_students/ExportStudentData";
import AdminSemProgression from "./pages/admin/manage_students/SemProgression";
import AdminManageCertificates from "./pages/admin/manage_certificates/ManageCertificates";
import AdminAddCertificate from "./pages/admin/manage_certificates/AddCertificate";
import AdminManageDocuments from "./pages/admin/manage_documents/ManageDocuments";
import AdminAddDocument from "./pages/admin/manage_documents/AddDocument";
import AdminIdCardGenerate from "./pages/admin/IdCardGenerate";
import AdminProfile from "./pages/admin/profile/Profile";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/test" element={<Dashboard />} />

        {/* Department routes */}
        <Route exact path="/login" element={<Login />} />

        {/* Admin routes */}

        <Route exact path="/admin/*" element={<AdminDashboard />}>
          <Route
            exact
            path="manage-faculties/manage-faculties"
            element={<AdminManageFaculties />}
          />
          <Route
            exact
            path="manage-faculties/add-faculties"
            element={<AdminAddFaculties />}
          />
          <Route
            exact
            path="manage-faculties/update-faculty/:id"
            element={<AdminAddFaculties />}
          />
          <Route
            exact
            path="manage-departments/manage-departments"
            element={<AdminManageDepartments />}
          />
          <Route
            exact
            path="manage-departments/update-department/:id"
            element={<AdminAddDepartments />}
          />
          <Route
            exact
            path="manage-departments/add-department"
            element={<AdminAddDepartments />}
          />
          <Route
            exact
            path="manage-students/add-student"
            element={<AdminAddStudents />}
          />
          <Route
            exact
            path="manage-students/export-student-data"
            element={<AdminExportStudentData />}
          />
          <Route
            exact
            path="manage-students/semester-progression"
            element={<AdminSemProgression />}
          />
          <Route
            exact
            path="manage-certificates"
            element={<AdminManageCertificates />}
          />
          <Route
            exact
            path="add-certificate"
            element={<AdminAddCertificate />}
          />
          <Route
            exact
            path="update-certificate/:id"
            element={<AdminAddCertificate />}
          />
          <Route
            exact
            path="manage-documents"
            element={<AdminManageDocuments />}
          />
          <Route exact path="add-document" element={<AdminAddDocument />} />
          <Route
            exact
            path="update-document/:id"
            element={<AdminAddDocument />}
          />
          <Route
            exact
            path="id-card-generate"
            element={<AdminIdCardGenerate />}
          />
          <Route exact path="profile/profile" element={<AdminProfile />} />
        </Route>

        {/* Department routes */}
        <Route path="/department/*" element={<DepartmentDashboard />}>
          <Route
            exact
            path="manage-students/add-student"
            element={<DepartmentAddStudents />}
          />
          <Route
            exact
            path="manage-students/approve-student"
            element={<DepartmentApproveStudents />}
          />
          <Route
            exact
            path="manage-students/export-student-data"
            element={<DepartmentExportStudentData />}
          />
          <Route
            exact
            path="manage-students/semester-progression"
            element={<DepartmentSemProgression />}
          />
          <Route
            exact
            path="manage-requests/update-requests"
            element={<DepartmentUpdateRequests />}
          />
          <Route
            exact
            path="manage-requests/certificate-requests"
            element={<DepartmentCertificateRequests />}
          />
          <Route exact path="profile/profile" element={<DepartmentProfile />} />
          <Route
            exact
            path="profile/change-password"
            element={<ChangePasswordModal />}
          />
        </Route>

        {/* Student routes */}
        <Route path="/student/*" element={<StudentDashboard />}>
          <Route
            exact
            path="certificate-request"
            element={<CertificateRequest />}
          />
          <Route
            exact
            path="certificate-status"
            element={<CertificateStatus />}
          />
          <Route exact path="profile/profile" element={<StudentProfile />} />

          <Route
            exact
            path="profile/update"
            element={<StudentUpdateRequest />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
