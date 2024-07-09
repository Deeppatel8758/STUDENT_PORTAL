 const { body, validationResult } = require("express-validator");
const ResponseCodes = require("../../helper/ResponseCodes");
const AdminQueries = require("../../Queries/AdminQueries");

const SemesterProgression = [
  body("semester")
    .notEmpty()
    .withMessage("Semester is required.")
    .isInt()
    .withMessage("Semester must be an Integer")
    .toInt()
    .isInt({ min: 1, max: 8 })
    .withMessage("Semester must be between 1 to 8"),

  body("branch")
    .notEmpty()
    .withMessage("Branch is required.")
    .isInt()
    .withMessage("Branch must be an Integer"),

  body("listOfStudent").isArray().withMessage("Student List must be an Array"),

  body("listOfStudent.*")
    .isInt()
    .withMessage("Invalid number. All enrollments must be integers."),

  async (req, res) => {
    if(req.user_info.role == "2"){
      if(req.user_info.departmentid != req.body.branch){
        return ResponseCodes.unauthorizedResponse(
          res,
          "You are not Eligible to Perform Semester Progression."
        )
      }
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      const { semester, branch, listOfStudent } = req.body;

      try {
        await AdminQueries.SemesterProgression(semester, branch, listOfStudent);

        console.log("semester progression done successfully");
        return ResponseCodes.successResponse(
          res,
          "semester progression done successfully"
        );
      } catch (error) {
        console.error(
          "error encoutered while progressing the semester:",
          error.message
        );
        return ResponseCodes.errorResponse(
          res,
          "error encoutered while progressing the semester"
        );
      }
    } else {
      return ResponseCodes.validationErrorWithData(
        res,
        errors.errors[0].msg,
        errors.errors[0]
      );
    }
  },
];

module.exports = SemesterProgression;
