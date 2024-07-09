const DepartmentQueries = require("../../Queries/DepartmentQueries");
const { body, validationResult } = require("express-validator");
const ResponseCodes = require("../../helper/ResponseCodes");
const sendToken = require("../../helper/sendToken");
const comparePassword = require("../../helper/ComparePassword");

const UserLogin = [
  body("username")
    .notEmpty()
    .withMessage("username is required")
    .isLength({ min: 5 })
    .withMessage("username must be atleast 5 characters"),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be atleast 8 characters"),
  body("role")
    .notEmpty()
    .withMessage("role is required")
    .isIn(["1", "2"])
    .withMessage("role must be 1 or 2"),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return ResponseCodes.errorResponseWithData(
          res,
          "Validation Error",
          errors.array()
        );
      }
      const data = req.body;
      console.log(data);

      const user = await DepartmentQueries.userLogin(data);
      console.log(user);
      if (user.role == data.role) {
        const token = sendToken(user, 200, res);
        return ResponseCodes.successResponseWithData(
          res,
          "User Login Successfully",
          {
            token: token,
            user: user,
          }
        );
      } else {
        return ResponseCodes.errorResponse(res, "Error in Login user");
      }
    } catch (err) {
      console.log(err);
      return ResponseCodes.errorResponse(res, "Error in Login user");
    }
  },
];
module.exports = UserLogin;
