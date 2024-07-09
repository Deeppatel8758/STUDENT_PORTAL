const { body, validationResult } = require("express-validator");
const AdminQueries = require("../../Queries/AdminQueries");
const ResponseCodes = require("../../helper/ResponseCodes");
const sendToken = require('../../helper/sendToken');

const UpdateUsername = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 8 })
    .withMessage("Username must be atleast 8 characters."),

  async (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      try {
        const user = await AdminQueries.AdminUpdateUsername(
          req.user_info.username
        );

        if (!user) {
          return ResponseCodes.errorResponse(res, "No User Found Here...");
        } else {
          user.username = req.body.username;
          const a = await user.save();
          if (a === undefined) {
            return ResponseCodes.errorResponse(
              res,
              "Error Caught While Updating the Username."
            );
          } else {
            console.log(user);
            const token = sendToken(user, res, 200);
            return ResponseCodes.successResponseWithData(
              res,
              "Admin Username Updated successfully.",
              { token: token }
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

module.exports = UpdateUsername;
