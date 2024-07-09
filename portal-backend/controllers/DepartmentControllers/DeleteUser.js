const { param, validationResult } = require("express-validator");
const ResponseCodes = require("../../helper/ResponseCodes");
const DepartmentQueries = require("../../Queries/DepartmentQueries");

const DeleteUser = [
  // param("userId").isInt({ min: 1 }).withMessage("userId should be an integer"),
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

    const { userId } = req.params;

    const deletedUser = await DepartmentQueries.deleteUser(userId);

    // user is not deleted
    if (deletedUser === 0) {
      return ResponseCodes.errorResponse(
        res,
        "User not deleted (not found or error in deletion)"
      );
    }

    return ResponseCodes.successResponseWithData(
      res,
      "User Deleted Successfully",
      deletedUser
    );
  },
];

module.exports = DeleteUser;
