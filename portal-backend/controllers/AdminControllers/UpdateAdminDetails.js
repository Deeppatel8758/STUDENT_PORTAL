const { body, validationResult } = require("express-validator");
const AdminQueries = require("../../Queries/AdminQueries");
const ResponseCodes = require("../../helper/ResponseCodes");
const sendToken = require('../../helper/sendToken');

const UpdateAdminDetails = [
    body("email").optional()
    .isEmail().normalizeEmail().withMessage("Invalid Email Format."),

    body("name").optional()
    .isString()
    .trim()
    .notEmpty().withMessage("Name must be a Non-Empty String."),

    body("departmentid").optional()
    .isInt().withMessage("Department must be a Integer.")
    .notEmpty().withMessage("Department must be a Not Empty."),

    body("contactNumber").optional()
    .isInt().withMessage("Contact Number must be a Integer.")
    .toInt()
    .isLength({ min: 10, max: 10 }).withMessage("Contact Number must be of Length 10.")
    .notEmpty().withMessage("Contact Number must be a Not Empty"),

    async(req, res) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            try {
                const details = req.body;
                const admin = await AdminQueries.AdminUpdateDetails(req.user_info.username, details, res);

                if (!admin) {
                  return ResponseCodes.errorResponse(res, "No User Found Here...");
                }
                else{
                  if (details.name !== undefined) {
                    admin.name = details.name;
                  }
              
                  if (details.departmentid !== undefined) {
                    admin.departmentid = details.departmentid;
                  }
              
                  if (details.contactNumber !== undefined) {
                    admin.contactNumber = details.contactNumber;
                  }
              
                  if (details.email !== undefined) {
                    admin.email = details.email;
                  }
            
                  const a = await admin.save();
                  if(a === undefined){
                    return ResponseCodes.errorResponse(res, "Error Caught While Updating the Admin Details.");
                  }
                  else{
                    const token = sendToken(admin, res, 200);
                    return ResponseCodes.successResponseWithData(res, "Admin Details Updated successfully.", {token: token});
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
    }
];

module.exports = UpdateAdminDetails;