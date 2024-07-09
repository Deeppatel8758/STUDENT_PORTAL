const { body, validationResult } = require("express-validator");
const ResponseCodes = require("../../helper/ResponseCodes");
const StudentQueries = require("../../Queries/StudentQueries");
const DepartmentQueries = require("../../Queries/DepartmentQueries");
const AdminQueries = require("../../Queries/AdminQueries");

const GetAllCertificateRequest = [

  async (req, res) =>
  {


    const AllCertificate = await AdminQueries.GetAllCertificate();
    console.log(AllCertificate)

    if (!AllCertificate)
    {
      return ResponseCodes.errorResponse(res, "Error in getting certificate requests");
    }

    return ResponseCodes.successResponseWithData(res, "Success", {
      certificateRequests: AllCertificate,
    });
  },
];



module.exports = GetAllCertificateRequest;

