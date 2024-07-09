const { param, validationResult } = require("express-validator");
const ResponseCodes = require("../../helper/ResponseCodes");
const DepartmentQueries = require("../../Queries/DepartmentQueries");

const CreateUnlockRequest = [
  // validate enrollment
  param("enrollment")
    .isLength({ min: 12, max: 12 })
    .withMessage("Invalid Enrollment Number"),
  async (req, res) => {
    const errors = validationResult(req);

    // checking for errors
    if (!errors.isEmpty()) {
      return ResponseCodes.validationErrorWithData(
        res,
        "Invalid Data",
        errors.array()
      );
    }

    // enrollment from URL params
    const { enrollment } = req.params;

    // check for existing lock in request
    const student = await DepartmentQueries.getUnlockRequest(enrollment);

    if (!student) {
      return ResponseCodes.successResponse(res, "Student Not Found", student);
    }

    const existingUnlockRequest = student.LockInDuration;

    const currentDate = new Date();
    if (existingUnlockRequest && currentDate < existingUnlockRequest) {
      return ResponseCodes.errorResponse(
        res,
        "Lock In Request Already Exists"
      );
    }

    // create new request
    const createUnlockRequest = await DepartmentQueries.createUnlockRequest(
      enrollment
    );

    if (createUnlockRequest[0] === 0) {
      return ResponseCodes.errorResponse(
        res,
        "Lock In Request Not Created"
      );
    }

    return ResponseCodes.successResponseWithData(
      res,
      "Lock In Request Created",
      createUnlockRequest
    );
  },
];

module.exports = CreateUnlockRequest;
