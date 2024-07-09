const { body, validationResult } = require("express-validator");
const ResponseCodes = require("../../helper/ResponseCodes");

const AdminQueries = require("../../Queries/AdminQueries");
const DepartmentQueries = require("../../Queries/DepartmentQueries");

const GerAllRequestOnType = [

  async (req, res) => {
    const errors = validationResult(req);

    const departmentid= req.user_info.departmentid;
    const AllCertificate = await DepartmentQueries.GerAllRequestOnType(departmentid,req);

    if (!AllCertificate) { 
      return ResponseCodes.errorResponse(res, "Error in getting certificate requests");
    }

    return ResponseCodes.successResponseWithData(res, "Success", {
      certificateRequests: AllCertificate,
    });
  },
];



module.exports = GerAllRequestOnType;

