const DepartmentQueries = require("../../Queries/DepartmentQueries");
const ResponseCodes = require("../../helper/ResponseCodes");

const GetAllStudentVerificationRequests = [
  async (req, res) => {

    // get the departmentId of the logged in faculty
    const departmentId = req.user_info.departmentid;

    const unverifiedStudents =
      await DepartmentQueries.getAllStudentVerificationRequests(departmentId);

    if (unverifiedStudents.length === 0) {
      return ResponseCodes.successResponse(res, "No unverified students found");
    }

    return ResponseCodes.successResponseWithData(
      res,
      "All unverified students fetched successfully",
      unverifiedStudents
    );
  },
];

module.exports = GetAllStudentVerificationRequests;
