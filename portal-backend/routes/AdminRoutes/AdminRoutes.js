const express = require("express");
const AdminRoutes = express.Router();
const app = express();
const TokenValidation = require("../../middlewares/TokenValidation");
const upload = require("../../helper/certificateFormatUpload");
const RoleValidation = require("../../middlewares/RoleValidation");
const ROLES = require("../../constants/constants").ROLES;
const {
  GetAllCertificateRequest,
  UploadStudentExcel,
  SemesterProgression,
  QuerySearchStudent,
  UpdatePassword,
  UpdateUsername,
  UpdateAdminDetails,
  CreateDynamicCategory,
  GetAllDynamicCategory,
  UpdateDynamicCategory,
  DeleteDynamicCategory,
  GetDynamicCategoryById,
  QueryRegisteredStudents,
  QueryCertificateRequests,
  GetProfileDetails,
  CreateNewDepartment,
  ReadAllDepartments,
  ReadDepartmentById,
  UpdateDepartmentDetails,
  DeleteDepartment,
  CreateDynamicCertificate,
  DeleteDynamicCertificate,
  UpdateDynamicCertificate,
  GetIndividualUser,
  UpdateAdminDetailsById,
} = require("../../controllers/AdminControllers");

AdminRoutes.get(
  "/getAllCertificate",
  TokenValidation,
  RoleValidation([ROLES.ADMIN, ROLES.DEPARTMENT, ROLES.STUDENT]),
  GetAllCertificateRequest
);

AdminRoutes.post(
  "/uploadStudentExcel",
  TokenValidation,
  RoleValidation([ROLES.ADMIN, ROLES.DEPARTMENT]),
  UploadStudentExcel
);

AdminRoutes.put(
  "/semesterProgression",
  TokenValidation,
  RoleValidation([ROLES.ADMIN, ROLES.DEPARTMENT]),
  SemesterProgression
);

AdminRoutes.get(
  "/querySearchStudent",
  TokenValidation,
  RoleValidation([ROLES.ADMIN, ROLES.DEPARTMENT]),
  QuerySearchStudent
);

AdminRoutes.put(
  "/updatePassword",
  TokenValidation,
  RoleValidation([ROLES.ADMIN]),
  UpdatePassword
);

AdminRoutes.put(
  "/updateUsername",
  TokenValidation,
  RoleValidation([ROLES.ADMIN]),
  UpdateUsername
);

AdminRoutes.put(
  "/updateAdminDetails",
  TokenValidation,
  RoleValidation([ROLES.ADMIN]),
  UpdateAdminDetails
);

AdminRoutes.put(
  "/updateAdminDetailsById",
  TokenValidation,
  RoleValidation([ROLES.ADMIN]),
  UpdateAdminDetailsById
);

AdminRoutes.post(
  "/createDynamicCategory",
  TokenValidation,
  RoleValidation([ROLES.ADMIN]),
  CreateDynamicCategory
);

AdminRoutes.get(
  "/getAllDynamicCategory",
  TokenValidation,
  RoleValidation([ROLES.ADMIN]),
  GetAllDynamicCategory
);

AdminRoutes.get(
  "/getDynamicCategoryById/:id",
  TokenValidation,
  RoleValidation([ROLES.ADMIN]),
  GetDynamicCategoryById
);

AdminRoutes.put(
  "/updateDynamicCategory",
  TokenValidation,
  RoleValidation([ROLES.ADMIN]),
  UpdateDynamicCategory
);

AdminRoutes.delete(
  "/deleteDynamicCategory/:id",
  TokenValidation,
  RoleValidation([ROLES.ADMIN]),
  DeleteDynamicCategory
);

AdminRoutes.get(
  "/students/q",
  TokenValidation,
  RoleValidation([ROLES.ADMIN]),
  QueryRegisteredStudents
);

AdminRoutes.get(
  "/requests/q",
  TokenValidation,
  RoleValidation([ROLES.ADMIN]),
  QueryCertificateRequests
);

AdminRoutes.post(
  "/createNewDepartment",
  TokenValidation,
  RoleValidation([ROLES.ADMIN]),
  CreateNewDepartment
);

AdminRoutes.get(
  "/readAllDepartments",
  TokenValidation,
  RoleValidation([ROLES.ADMIN]),
  ReadAllDepartments
);

AdminRoutes.get(
  "/readDepartmentById/:departmentId",
  TokenValidation,
  RoleValidation([ROLES.ADMIN]),
  ReadDepartmentById
);

AdminRoutes.post(
  "/updateDepartmentDetails",
  TokenValidation,
  RoleValidation([ROLES.ADMIN]),
  UpdateDepartmentDetails
);

AdminRoutes.delete(
  "/deleteDepartment/:departmentId",
  TokenValidation,
  RoleValidation([ROLES.ADMIN]),
  DeleteDepartment
);

AdminRoutes.post(
  "/createDynamicCertificate",
  TokenValidation,
  RoleValidation([ROLES.ADMIN]),
  upload.single("certificateFormatDocument"),
  CreateDynamicCertificate
);

AdminRoutes.delete(
  "/deleteDynamicCertificate/:id",
  TokenValidation,
  RoleValidation([ROLES.ADMIN]),
  DeleteDynamicCertificate
);

AdminRoutes.put(
  "/updateDynamicCertificate",
  TokenValidation,
  RoleValidation([ROLES.ADMIN]),
  UpdateDynamicCertificate
);

AdminRoutes.get(
  "/getProfileDetails",
  TokenValidation,
  RoleValidation([ROLES.ADMIN, ROLES.DEPARTMENT]),
  GetProfileDetails
);

AdminRoutes.get(
  "/getUserById/:username",
  TokenValidation,
  RoleValidation([ROLES.ADMIN, ROLES.DEPARTMENT]),
  GetIndividualUser
);

module.exports = AdminRoutes;
