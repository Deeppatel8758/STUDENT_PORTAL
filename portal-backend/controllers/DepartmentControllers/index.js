const ReadStudentData = require("./ReadStudentData");
const UpdateCertificateRequestStatus = require("./UpdateCertificateRequestStatus");
const CreateNewUser = require("./CreateNewUser");
const UserLogin = require("./UserLogin");
const GetAllUsers = require("./GetAllUsers");
const GetUsersByDepartmentId = require("./GetUsersByDepartmentId");
const DeleteUser = require("./DeleteUser");
const VerifyStudent = require("./VerifyStudent");
const CreateUnlockRequest = require("./CreateUnlockRequest");
const GetDepartmentStudentDetails = require("./GetDepartmentStudentDetails");
const GetAllCertificateRequests = require("./GetAllCertificateRequests");
const GerAllRequestOnType = require("./GerAllRequestOnType");
const GetCertificateRequestDocuments = require("./GetCertificateRequestDocuments");
const GetAllStudentVerificationRequests = require("./GetAllStudentVerificationRequests");
const GetAllLockInRequests = require("./GetAllLockInRequests");
const RejectLockInRequest = require("./RejectLockInRequest");
const ChangeDepartmentPassword = require("./ChangeDepartmentPassword");

module.exports = {
  ReadStudentData,
  UpdateCertificateRequestStatus,
  CreateNewUser,
  UserLogin,
  GetAllUsers,
  GetUsersByDepartmentId,
  DeleteUser,
  VerifyStudent,
  CreateUnlockRequest,
  GetDepartmentStudentDetails,
  GetAllCertificateRequests,
  GerAllRequestOnType,
  GetCertificateRequestDocuments,
  GetAllStudentVerificationRequests,
  GetAllLockInRequests,
  RejectLockInRequest,
  ChangeDepartmentPassword,
};
