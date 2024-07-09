const express = require("express");
const StudentRoutes = express.Router();
const TokenValidation = require("../../middlewares/TokenValidation");
const RoleValidation = require("../../middlewares/RoleValidation");
const { ROLES } = require("../../constants/constants");
const upload = require("../../helper/multerConfig");

// const { body, validationResult } = require("express-validator");
// const ResponseCodes = require("../../helper/ResponseCodes");
// const AdminQueries = require("../../Queries/AdminQueries");
// const DepartmentQueries = require("../../Queries/DepartmentQueries");

const {
  RegisterStudent,
  UserLogin,
  GetAllCertificateType,
  GetStudentCertificateRequest,
  DeleteCertificateRequest,
  GetDownloadCertificateDetails,
  GetCertificateAssociatedDocuments,
  GetCertificateOnRequestType,
  GetProfileDetails,
  RequestCertificate,
  GetCertificateOnId,
  UpdateStudentDetails,
  GetAllCertificateTypeOnAdmin,
  UpdateTimeLineAndUpdate,
  ChangePassword,

} = require("../../controllers/StudentControllers");

StudentRoutes.get(
  "/getStudentProfileDetails",
  TokenValidation,
  GetProfileDetails
);

StudentRoutes.post("/login", UserLogin);

// StudentRoutes.post("/register", RegisterStudent);

// StudentRoutes.post("/certificate/request", TokenValidation, RequestCertificate);

StudentRoutes.put(
  "/updateStudentDetails",
  TokenValidation,
  UpdateStudentDetails
);

StudentRoutes.get(
  "/certificate/getAllCertificateType",
  TokenValidation,
  GetAllCertificateType
);
StudentRoutes.get(
  "/certificate/getAllCertificateTypeOnAdmin",
  TokenValidation,
  GetAllCertificateTypeOnAdmin
);

StudentRoutes.get(
  "/certificate/getAllCertificateType/:certiid",
  TokenValidation,
  GetCertificateOnId
);

StudentRoutes.get(
  "/certificate/getStudentCertificateRequest",
  TokenValidation,
  GetStudentCertificateRequest
);

StudentRoutes.delete(
  "/certificate/deleteCertificateRequest",
  TokenValidation,
  DeleteCertificateRequest
);

StudentRoutes.get(
  "/certificate/getDownloadCertificateDetails/:requestId",
  TokenValidation,
  RoleValidation([ROLES.ADMIN, ROLES.DEPARTMENT, ROLES.STUDENT]),
  GetDownloadCertificateDetails
);

StudentRoutes.get(
  "/certificate/getCertificateAssociatedDocuments",
  TokenValidation,
  GetCertificateAssociatedDocuments
);

StudentRoutes.get(
  "/certificate/:requestType",
  TokenValidation,
  GetCertificateOnRequestType
);

StudentRoutes.get(
  "/getStudentProfileDetails/:enrollment",
  TokenValidation,
  RoleValidation([ROLES.ADMIN, ROLES.DEPARTMENT, ROLES.STUDENT]),
  GetProfileDetails
);
StudentRoutes.post("/login", UserLogin);
StudentRoutes.patch(
  "/register",
  TokenValidation,
  RoleValidation([ROLES.STUDENT]),
  upload.array("files", 10),
  RegisterStudent
);
StudentRoutes.post(
  "/certificate/request",
  TokenValidation,
  RoleValidation([ROLES.STUDENT]),
  upload.array("files", 3),
  RequestCertificate
);

StudentRoutes.put(
  "/updateStudentDetails",
  TokenValidation,
  RoleValidation([ROLES.STUDENT]),
  UpdateStudentDetails
);

StudentRoutes.patch(
  "/updateLockInDurationWithAllowUpdate",
  TokenValidation,
  RoleValidation([ROLES.STUDENT]),
  UpdateTimeLineAndUpdate
);

StudentRoutes.put(
  "/changePassword",
  TokenValidation,
  RoleValidation([ROLES.STUDENT]),
  ChangePassword
);


module.exports = StudentRoutes;
