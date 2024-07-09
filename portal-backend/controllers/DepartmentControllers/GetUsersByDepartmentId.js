const DepartmentQueries = require("../../Queries/DepartmentQueries");
const { param, validationResult } = require("express-validator");
const ResponseCodes = require("../../helper/ResponseCodes");

const GetUsersByDepartmentId = [
  param("departmentId")
    .isInt({ min: 1, max: 17 })
    .withMessage("departmentId should be an integer between 1 and 17"),
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

    const { departmentId } = req.params;
    console.log(departmentId);

    const users = await DepartmentQueries.getUsersByDepartmentId(departmentId);

    if (users.length === 0) {
      return ResponseCodes.successResponse(res, `No Users found`);
    }

    return ResponseCodes.successResponseWithData(res, "Success", users);
  },
];

module.exports = GetUsersByDepartmentId;
