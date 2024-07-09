const { body, validationResult } = require("express-validator");
const EncryptPassword = require("../../helper/EncryptPassword");
const AdminQueries = require("../../Queries/AdminQueries");
const ResponseCodes = require("../../helper/ResponseCodes");

const UpdatePassword = [
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be atleast 8 characters"),
  body("username")
    .notEmpty()
    .withMessage("You Must be Logged In "),

  async (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      try {
        const hash = EncryptPassword(req.body.password);
        const user = await AdminQueries.AdminUpdatePassword(
          req.user_info.username
        );

        if (!user) {
          return ResponseCodes.errorResponse(res, "No User Found Here...");
        } else {
          user.password = hash;
          const a = await user.save();
          if (a === undefined) {
            return ResponseCodes.errorResponse(
              res,
              "Error Caught While Updating the Password."
            );
          } else {
            return ResponseCodes.successResponse(
              res,
              "Admin Password Updated successfully."
            );
          }
        }
      } catch (error) {
        console.log(error);
        return ResponseCodes.errorResponse(res,
          error.hasOwnProperty('errors') 
              ? error.errors[0].message
              : error.message
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

module.exports = UpdatePassword;
