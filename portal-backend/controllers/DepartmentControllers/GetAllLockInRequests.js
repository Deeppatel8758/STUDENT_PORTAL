const DepartmentQueries = require("../../Queries/DepartmentQueries");
const ResponseCodes = require("../../helper/ResponseCodes");

const GetAllLockInRequests = [
  async (req, res) => {
    const departmentId = req.user_info.departmentid;

    const lockInRequests = await DepartmentQueries.getAllLockInRequests(departmentId);

    if (lockInRequests.length === 0) {
      return ResponseCodes.errorResponse(res, "No lock in requests found");
    }

    const currentDuration = new Date();

    // Loop through the lockInRequests array and add the 'status' field
    lockInRequests.forEach((lockInRequest) => {
      if (
        lockInRequest.LockInDuration &&
        currentDuration < lockInRequest.LockInDuration
      ) {
        // show PENDING in the student row
        lockInRequest.status = "PENDING";
      } else {
        // show APPROVE and REJECT buttons
        lockInRequest.status = "NOT PENDING";
      }
    });

    console.log("all requests", lockInRequests);

    return ResponseCodes.successResponseWithData(
      res,
      "All lock in requests fetched successfully",
      lockInRequests
    );
  },
];

module.exports = GetAllLockInRequests;
