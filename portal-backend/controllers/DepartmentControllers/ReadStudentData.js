const { param, validationResult } = require("express-validator");
const ResponseCodes = require("../../helper/ResponseCodes");
const DepartmentQueries = require("../../Queries/DepartmentQueries");

const ReadStudentData = [
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

    // getting student data
    // studentData contains both studentCollegeDetails and studentPersonalDetails
    const studentData = await DepartmentQueries.getStudentData(
      enrollment,
      req.user_info.departmentid
    );

    // success response but student not found
    if (studentData === null) {
      return ResponseCodes.successResponse(
        res,
        `No Student With Enrollment ${enrollment} found`
      );
    }

    return ResponseCodes.successResponseWithData(res, "Success", studentData);
  },
];

module.exports = ReadStudentData;
