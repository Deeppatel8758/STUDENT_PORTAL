const DepartmentQueries = require("../../Queries/DepartmentQueries");
const { body, validationResult } = require("express-validator");
const ResponseCodes = require("../../helper/ResponseCodes");

const RejectLockInRequest = [
  // validate enrollment and comment
  body("enrollment")
    .notEmpty()
    .withMessage("Enrollment Number is required")
    .isLength({ min: 12, max: 12 })
    .withMessage("Invalid Enrollment Number"),
  body("comment")
    .isLength({ min: 1 })
    .withMessage("Comment is required")
    .isString()
    .withMessage("Comment must be of type string"),
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
    const { enrollment, comment } = req.body;

    const rejectLockInRequest = await DepartmentQueries.rejectLockInRequest(
      enrollment,
      comment
    );

    if (rejectLockInRequest[0] === 0) {
      return ResponseCodes.errorResponse(
        res,
        `No Student With Enrollment ${enrollment} found`
      );
    }

    return ResponseCodes.successResponseWithData(
      res,
      "Success",
      rejectLockInRequest
    );
  },
];

module.exports = RejectLockInRequest;
