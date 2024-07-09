const { body, param } = require("express-validator");
const AdminQueries = require("../../Queries/AdminQueries");
const ResponseCodes = require("../../helper/ResponseCodes");

const GetDynamicCategoryById = [
  param("id").isInt({ min: 1 }).withMessage("id should be an integer"),
  async (req, res) => {
    try {
      const category = await AdminQueries.GetDynamicCategoryById(req.params.id);
      return ResponseCodes.successResponseWithData(
        res,
        "Categories Fetched Successfully",
        category
      );
    } catch (error) {
      console.log(error);
      return ResponseCodes.errorResponse(
        res,
        error.hasOwnProperty("errors") ? error.errors[0].message : error.message
      );
    }
  },
];

module.exports = GetDynamicCategoryById;
