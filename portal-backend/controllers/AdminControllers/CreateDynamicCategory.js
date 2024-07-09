const { body, validationResult } = require("express-validator");
const AdminQueries = require("../../Queries/AdminQueries");
const ResponseCodes = require("../../helper/ResponseCodes");

const docTypes = ["STRING", "INTEGER", "FLOAT", "DATEONLY", "FILE", "BIGINT"];

const regex = /^[0-9 a-z A-Z 0-9 ]*$/;

const isValidCategoryName = (value) => {
    return regex.test(value);
};

const CreateDynamicCategory = [

    body("categoryName")
    .notEmpty().withMessage("Category Name is Required.")
    .custom((value) => {
        if (!isValidCategoryName(value)) {
          throw new Error('Document Category Name should only contain alphabets (a-z) and spaces');
        }
        return true;
      }),

    body("categoryType")
    .notEmpty().withMessage("Category Type is Required.")
    .custom((value) => {
        if (!docTypes.includes(value)) {
          throw new Error(
            `Document Type must be one of the specified values: ${docTypes.join(
              ", "
            )}.`
          );
        }
        return true;
    }),

    async(req, res) => {
        const errors = validationResult(req);

        if(errors.isEmpty()){
            try {
                var {categoryName, categoryType} = req.body;
                categoryName = categoryName.trim().replace(/\s+/g, '_');
                categoryName = categoryName.toUpperCase();
                console.log(categoryName);

                const a = await AdminQueries.CreateDynamicCategory(categoryName, categoryType);
                
                if(a === undefined){
                    return ResponseCodes.successResponse(res, "Document Category Created Successfully.");
                }
                else{
                    return ResponseCodes.errorResponse(res, "Error Caught While Creating the Document Category.");
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

module.exports = CreateDynamicCategory;