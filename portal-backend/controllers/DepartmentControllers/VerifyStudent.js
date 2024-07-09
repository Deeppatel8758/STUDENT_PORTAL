const { param, validationResult } = require("express-validator");
const ResponseCodes = require("../../helper/ResponseCodes");
const DepartmentQueries = require("../../Queries/DepartmentQueries");

const VerifyStudent = [
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

    // verify student
    const verifyStudentCount = await DepartmentQueries.verifyStudent(
      enrollment
    );

    if (verifyStudentCount[0] === 0) {
      return ResponseCodes.errorResponse(
        res,
        "Student Not Verified (No Student with given enrollment)"
      );
    }

    return ResponseCodes.successResponseWithData(
      res,
      "Student Verified",
      verifyStudentCount
    );
  },
];

module.exports = VerifyStudent;
