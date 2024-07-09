const { body, validationResult } = require("express-validator");
const AdminQueries = require("../../Queries/AdminQueries");
const ResponseCodes = require("../../helper/ResponseCodes");

const docTypes = ["STRING", "INTEGER", "FLOAT", "DATEONLY", "FILE", "BIGINT"];

const isValidOldCategoryName = (value) => {
  return /^[A-Za-z_]+$/.test(value);
};

const isValidCategoryName = (value) => {
  return /^[A-Za-z_]+$/.test(value);
};

const UpdateDynamicCategory = [

  body("id")
  .notEmpty()
  .withMessage("id is required.")
  .isInt({ min: 1})
  .withMessage("id should be an integer"),

  // body("oldCategoryName")
  //   .notEmpty()
  //   .withMessage("Old Category Name is required.")
  //   .custom((value) => {
  //     if (!isValidOldCategoryName(value)) {
  //       throw new Error(
  //         "Document Category Name should only contain alphabets (a-z) and uderscore"
  //       );
  //     }
  //     return true;
  //   })
  //   .trim()
  //   .customSanitizer((value) => value.toUpperCase()),

  body("categoryName")
    .if(body("categoryType").isEmpty())
    .notEmpty()
    .withMessage("Either Category Name or Category Type is required.")
    .custom((value) => {
      if (!isValidCategoryName(value)) {
        throw new Error(
          "Document Category Name should only contain alphabets (a-z) and spaces"
        );
      }
      return true;
    }),

  body("categoryType")
    .if(body("categoryName").isEmpty())
    .notEmpty()
    .withMessage("Either Category Name or Category Type is required.")
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

  async (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      try {
        var details = req.body;

        console.log(details.id);

        const category = await AdminQueries.UpdateDynamicCategory(
        
          details.categoryName,
          details.categoryType,
          details.id
        );

        console.log("UPDATED CAT: ", category);


        // if (!category) {
        //   return ResponseCodes.errorResponse(res, "No Category Found Here...");
        // } else {
        //   if (details.categoryName !== undefined) {
        //     details.categoryName = details.categoryName
        //       .trim()
        //       .replace(/\s+/g, "_");
        //     details.categoryName = details.categoryName.toUpperCase();
        //     console.log(details.categoryName);
        //     category.categoryname = details.categoryName;
        //   }
        //   if (details.categoryType !== undefined) {
        //     console.log(details.categoryType);
        //     category.categorydatatype = details.categoryType;
        //   }

        //   const a = await category.save();
        //   if (a === undefined) {
        //     return ResponseCodes.errorResponse(
        //       res,
        //       "Error Caught While Updating the Category Details."
        //     );
        //   } else {
        //     return ResponseCodes.successResponse(
        //       res,
        //       "Category Updated successfully."
        //     );
        //   }
        // }

        return res.status(200).json({"msg": "done"})
      } catch (error) {
        console.log(error);
        return ResponseCodes.errorResponse(
          res,
          error.hasOwnProperty("errors")
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

module.exports = UpdateDynamicCategory;
