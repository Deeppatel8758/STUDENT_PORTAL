const DepartmentQueries = require("../../Queries/DepartmentQueries");
const ResponseCodes = require("../../helper/ResponseCodes");

const GetAllCertificateRequests = async (req, res) => {
  try {
    // Get the department id from the user_info
    const departmentId = req.user_info.departmentid;

    // get certificate requests
    const certificateRequests =
      await DepartmentQueries.getAllCertificateRequests(departmentId);

    // empty certificateRequests
    if (certificateRequests.rows.length === 0) {
      return ResponseCodes.successResponse(
        res,
        "No certificate requests found for your department"
      );
    }

    // Success response
    return ResponseCodes.successResponseWithData(
      res,
      "Success",
      certificateRequests
    );
  } catch (error) {
    console.log(error);
    return ResponseCodes.errorResponse(res, "Error");
  }
};

module.exports = GetAllCertificateRequests;
