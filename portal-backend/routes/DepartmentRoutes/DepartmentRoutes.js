const express = require("express");
const DepartmentRoutes = express.Router();
const TokenValidation = require("../../middlewares/TokenValidation");
const RoleValidation = require("../../middlewares/RoleValidation");
const ROLES = require("../../constants/constants").ROLES;
const {
  ReadStudentData,
  GetAllCertificateRequests,
  UpdateCertificateRequestStatus,
  GetDepartmentStudentDetails,
  CreateNewUser,
  GetAllUsers,
  GetUsersByDepartmentId,
  DeleteUser,
  UserLogin,
  GerAllRequestOnType,
  GetCertificateRequestDocuments,
  GetAllStudentVerificationRequests,
  VerifyStudent,
  CreateUnlockRequest,
  GetAllLockInRequests,
  RejectLockInRequest,
  ChangeDepartmentPassword,
} = require("../../controllers/DepartmentControllers");

DepartmentRoutes.get(
  "/getStudentData/:enrollment",
  TokenValidation,
  RoleValidation([ROLES.DEPARTMENT, ROLES.ADMIN]),
  ReadStudentData
);

DepartmentRoutes.get(
  "/getAllCertificateRequests",
  TokenValidation,
  RoleValidation([ROLES.ADMIN, ROLES.DEPARTMENT]),
  GetAllCertificateRequests
);

DepartmentRoutes.post(
  "/updateCertificateRequestStatus",
  TokenValidation,
  RoleValidation([ROLES.ADMIN, ROLES.DEPARTMENT]),
  UpdateCertificateRequestStatus
);

DepartmentRoutes.get(
  "/getDepartmentStudentDetails",
  TokenValidation,
  RoleValidation([ROLES.ADMIN, ROLES.DEPARTMENT]),
  GetDepartmentStudentDetails
);

DepartmentRoutes.post(
  "/createNewUser",
  TokenValidation,
  RoleValidation([ROLES.ADMIN]),
  CreateNewUser
);

DepartmentRoutes.get(
  "/getAllUsers",
  TokenValidation,
  RoleValidation([ROLES.ADMIN]),
  GetAllUsers
);

DepartmentRoutes.get(
  "/getAllUsers/:departmentId",
  TokenValidation,
  RoleValidation([ROLES.ADMIN]),
  GetUsersByDepartmentId
);

DepartmentRoutes.delete(
  "/deleteUser/:userId",
  TokenValidation,
  RoleValidation([ROLES.ADMIN]),
  DeleteUser
);

DepartmentRoutes.post("/login", UserLogin);

DepartmentRoutes.get(
  "/getRequest/:requestType",
  TokenValidation,
  RoleValidation([ROLES.ADMIN, ROLES.DEPARTMENT]),
  GerAllRequestOnType
);

DepartmentRoutes.get(
  "/getCertificateRequestDocument/:requestId",
  TokenValidation,
  RoleValidation([ROLES.ADMIN, ROLES.DEPARTMENT]),
  GetCertificateRequestDocuments
);

// 1 - to initially show all the student verification requests
// 4.1 - will not show the student verification requests that are unlocked
DepartmentRoutes.get(
  "/getAllStudentVerificationRequests",
  TokenValidation,
  RoleValidation([ROLES.ADMIN, ROLES.DEPARTMENT]),
  GetAllStudentVerificationRequests
);

// 2 - to verify students from the student verification requests
// 4.2.1 - to approve the student lock in request
DepartmentRoutes.patch(
  "/verifyStudent/:enrollment",
  TokenValidation,
  RoleValidation([ROLES.ADMIN, ROLES.DEPARTMENT]),
  VerifyStudent
);

// 3 - to create a new unlock request
DepartmentRoutes.patch(
  "/createUnlockRequest/:enrollment",
  TokenValidation,
  RoleValidation([ROLES.ADMIN, ROLES.DEPARTMENT]),
  CreateUnlockRequest
);

// 4.2 - shows all the requests that are unlocked and pending to approve or reject
// - check the status of the lock in requests
// - show PENDING ui (status is PENDING)
// - show APPROVE and REJECT buttons (status is NOT PENDING)
DepartmentRoutes.get(
  "/getAllLockInRequests",
  TokenValidation,
  RoleValidation([ROLES.ADMIN, ROLES.DEPARTMENT]),
  GetAllLockInRequests
);

// 4.2.2 - to reject the student lock in request
DepartmentRoutes.patch(
  "/rejectStudentLockInRequest",
  TokenValidation,
  RoleValidation([ROLES.ADMIN, ROLES.DEPARTMENT]),
  RejectLockInRequest
);

DepartmentRoutes.put(
  "/changeDepartmentPassword",
  TokenValidation,
  RoleValidation([ROLES.ADMIN, ROLES.DEPARTMENT]),
  ChangeDepartmentPassword
);

// Profile Locking and Unlocking Logic (Department Side)
// 1. show all initial verification requests to the department of their specific student (dpeartmentVerified is false, allow update is true, lockInDuration is null) (show unlocked icon in the student row)

// 2. after initial verification (departmentverified is true, allow update is false, lockInDuration is null) (show locked icon in the student row)

// 3. unlock request - (department verified is false, allow update is true, lockInDuration is tomorrow's date) (to unlock the profile click on the lock button on the student row) (create a new unlock profile request)

// 4.1 if profile is unlocked and the current time is less than lock in time do not show that request in the student request table instead show in the lockInRequests table (departmentverified is false, allow update is true, lockInDuration is from DB)

// 4.2 after the lockin peroid (show the approve and reject buttons in the student row in active request)
//    4.2.0 (show the requests that are pending i.e. the currect data is less than lockInDuration) (departmentverified is false, allow update is true, lockInDuration is from DB)
//    4.2.1 (approve then data is already in DB, departmentverified is true, allow update is false, lockInDuration is null)
//    4.2.2 (reject then reject with comment and increase the lockinduration to another day, departmentverified is false, allow update is true, lockInDuration is tomorrow's date) (show the PENDING ui in the student row)

module.exports = DepartmentRoutes;
