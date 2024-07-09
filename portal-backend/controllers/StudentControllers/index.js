const RegisterStudent = require("./RegisterStudent");
const UserLogin = require("./LoginStudent");
const GetAllCertificateType = require("./GetAllCertificateType");
const GetStudentCertificateRequest = require("./GetStudentCertificateRequest");
const DeleteCertificateRequest = require("./DeleteCertificateRequest");
const GetDownloadCertificateDetails = require("./GetDownloadCertificateDetails");
const GetCertificateAssociatedDocuments = require("./GetCertificateAssociatedDocuments");
const GetCertificateOnRequestType = require("./GetCertificateOnRequestType");
const GetAllRejectedRequest = require("./GetAllRejectedRequest");
const GetAllPendingRequest = require("./GetAllPendingRequest");
const GetProfileDetails = require("./GetStudentProfileData");
const RequestCertificate = require("./RequestCertificate");
const UpdateStudentDetails = require("./UpdateStudentDetails");
const GetCertificateOnId = require("./GetCertificateOnId");
const GetAllCertificateTypeOnAdmin = require("./GetAllCertificateTypeOnAdmin");
const UpdateTimeLineAndUpdate = require("./UpdateTimeLineAndUpdate");
const ChangePassword = require("./ChangePassword");
module.exports = {
  RegisterStudent,
  UserLogin,
  GetAllCertificateType,
  GetAllCertificateTypeOnAdmin,
  GetStudentCertificateRequest,
  DeleteCertificateRequest,
  GetDownloadCertificateDetails,
  GetCertificateAssociatedDocuments,
  GetAllCertificateType,
  GetCertificateOnRequestType,
  GetCertificateOnId,
  UpdateTimeLineAndUpdate,
  /*   GetAllApprovedRequest,
  GetAllRejectedRequest,    
  GetAllPendingRequest, */
  GetProfileDetails,
  RequestCertificate,
  UpdateStudentDetails,
  ChangePassword,
};
