const mode = "local";
let domain = "";
let itemId = "";
switch (mode) {
  case "local":
    domain = "http://localhost:3000/routes/";
    break;
  case "development":
    domain = "";
    break;
  case "production":
    domain = "";

    break;
  default:
    domain = "http://localhost:3000/routes/";
}

export default {
  //Authentication routes
  adminlogin: `${domain}department/login`,
  studentlogin: `${domain}student/login`,

  // Admin routes
  searchStudentforsemester: `${domain}admin/semesterProgression`,
  serchStudentbyDepartment: `${domain}admin/students/q`,
  getAllDepartmentList: `${domain}admin/readAllDepartments`,
  addnewfaculties: `${domain}department/createNewUser`,
  importStudentData: `${domain}admin/import-student-data`,
  adminprofile: `${domain}admin/getProfileDetails`,
  changeadminpassword: `${domain}admin/updatePassword`,
  uploadStudentExcel: `${domain}admin/uploadStudentExcel`,
  getAllDepartments: `${domain}admin/readAllDepartments`,
  fetchFacultiesData: `${domain}department/getAllUsers`,
  deleteFacultiesData: `${domain}department/deleteUser/`,
  createNewFaculty: `${domain}department/createNewUser`,
  getAllFaculties: `${domain}department/getAllUsers`,
  getUserById: `${domain}admin/getUserById/`,
  updateUser: `${domain}admin/updateAdminDetailsById`,
  createDocument: `${domain}admin/createDynamicCategory`,
  getAllDocuments: `${domain}admin/getAllDynamicCategory`,
  getDocumentById: `${domain}admin/getDynamicCategoryById/`,
  updateDocument: `${domain}admin/updateDynamicCategory`,
  deleteDocument: `${domain}admin/deleteDynamicCategory/`,
  getAllTags: `${domain}admin/getAllTags`,
  addCertificate: `${domain}admin/createDynamicCertificate`,
  getAllCertificates: `${domain}student/certificate/getAllCertificateType`,
  getAllCertificatesOnAdmin: `${domain}student/certificate/getAllCertificateTypeOnAdmin`,
  deleteCertificate: `${domain}admin/deleteDynamicCertificate/`,
  addDepartment: `${domain}admin/createNewDepartment`,
  deleteDepartment: `${domain}admin/deleteDepartment/`,
  getDeparmentById: `${domain}admin/readDepartmentById/`,
  updateDepartment: `${domain}admin/updateDepartmentDetails`,

  // Department routes
  searchStudent: `${domain}admin/querySearchStudent`,
  semesterProgression: `${domain}admin/semesterProgression`,
  getAllStudentVerificationRequests: `${domain}department/getAllStudentVerificationRequests`,
  getAllLockInRequests: `${domain}department/getAllLockInRequests`,
  approveStudentVerificatonReq: `${domain}department/verifyStudent`,
  getStudentDetailByEnrollment: `${domain}department/getStudentData`,
  unlockStudent: `${domain}department/createUnlockRequest`,
  rejectStudent: `${domain}department/rejectStudentLockInRequest`,
  getcertificaterequests: `${domain}department/getAllCertificateRequests`,
  getCertificateRequestOnType: `${domain}department/getRequest`,
  getcertificaterequestdocuments: `${domain}department/getCertificateRequestDocument/`,
  readstudentdata: `${domain}department/getStudentData/`,
  updatecertificatestatus: `${domain}department/updateCertificateRequestStatus`,
  changeDepartmentPassword: `${domain}department/changeDepartmentPassword`,

  // Student routes
  getStudentCertificateRequestOnType: `${domain}student/certificate`,
  updateStudentDetails: `${domain}student/updateStudentDetails`,
  registerStudentDetails: `${domain}student/register`,
  makeCertificateRequest: `${domain}student/certificate/request`,
  getStudentDetails: `${domain}student/getStudentProfileDetails`,
  getCertificateRequests: `${domain}student/certificate`,
  getAllCertificatesTypes: `${domain}student/certificate/getAllCertificateType`,
  getCertificateDocuments: `${domain}student/certificate/getAllCertificateType`,
  DownloadCertificate: `${domain}student/certificate/getDownloadCertificateDetails/`,
  updateAllowUpdate: `${domain}student/updateLockInDurationWithAllowUpdate`,
  changePassword: `${domain}student/changePassword`,
};
