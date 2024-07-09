const { body, validationResult } = require("express-validator");
const AdminQueries = require("../../Queries/AdminQueries");
const ResponseCodes = require("../../helper/ResponseCodes");

const isValidCategoryName = (value) => {
    return /^[A-Za-z_]+$/.test(value);
};

const DeleteDynamicCategory = [
    
    // body("categoryName")
    // .notEmpty().withMessage('Category Name is required.')
    // .custom((value) => {
    //     if (!isValidCategoryName(value)) {
    //       throw new Error('Document Category Name should only contain alphabets (a-z) and uderscore');
    //     }
    //     return true;
    //   })
    //   .trim()
    //   .customSanitizer((value) => value.toUpperCase()),

      async(req, res) => {

        const errors = validationResult(req);

        if(errors.isEmpty()){
            try {
                var {id} = req.params;

                const deletedRows = await AdminQueries.DeleteDynamicCategory(id);
                
                if(deletedRows > 0){
                    return ResponseCodes.successResponse(res, "Certificate Disabled Successfully.");
                }
                else{
                    return ResponseCodes.errorResponse(res, "Certificate Not Found for this Category Name.");
                }
            } catch (error) {
                console.log(error);
                return ResponseCodes.errorResponse(res,
                    error.hasOwnProperty('errors') 
                        ? error.errors[0].message
                        : error.message
                );
            }
        }
        else{
            return ResponseCodes.validationErrorWithData(
                res,
                errors.errors[0].msg,
                errors.errors[0]
            );
        }
      }
];

module.exports = DeleteDynamicCategory;