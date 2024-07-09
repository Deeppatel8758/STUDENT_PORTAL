const { body, validationResult } = require("express-validator");
const ResponseCodes = require("../../helper/ResponseCodes");
const DepartmentQueries = require("../../Queries/DepartmentQueries");
const { generate1 } = require("../../helper/generateCertificate")
const StudentQueries = require("../../Queries/StudentQueries");
const UpdateCertificateRequestStatus = [
  body("requestId")
    .isInt({ min: 1 })
    .withMessage("Certificate Request ID must be a positive integer"),
  body("status")
    .isIn(["PENDING", "APPROVED", "REJECTED"])
    .withMessage("Invalid status value (PENDING, APPROVED, REJECTED)"),
  body("comment")
    // comment is required only if status is REJECTED
    .if((value, { req }) => req.body.status === "REJECTED")
    .notEmpty()
    .withMessage("Field 'comment' must not be empty")
    .isString()
    .withMessage("Field 'comment' must be a string"),
  async (req, res) => {
    // check validation errors
    const errors = validationResult(req);

    // checking for errors
    if (!errors.isEmpty()) {
      return ResponseCodes.validationErrorWithData(
        res,
        "Invalid Data",
        errors.array()
      );
    }

    const { requestId, status, comment } = req.body;
    console.log(requestId)

    // update certificate request status
    const {updateCount,newCertiSerial} =await DepartmentQueries.updateCertificateRequestStatus(requestId, status, comment);

    
    // 0 means no rows were updated (no certificate request with given id or any other error)
    if (updateCount[0] === 0) {
      return ResponseCodes.successResponse(
        res,
        "Certificate Request Status Not Updated",
        updateCount
      );
    }


 const certificateRequest =await StudentQueries.getApprovedCertificateDetails(requestId);
    
  const certificateType = certificateRequest.certificatetype;

    const certificate = await StudentQueries.getCertificateInfo(
          certificateType
        );
        const enrollment = certificateRequest.enrollment;
        const certificateDocumentVariables = certificate.CertificateVariables;
        const certificateVariables = certificateDocumentVariables.split(",");
        const variables = [...certificateVariables, "enrollment"];

        // DONE TILL HERE!

        // if (getDocumentDetails) {
        //   const allfields = [...variables, enrollment];

        //   const getAllVariableData = await DepartmentQueries.getStudentData(
        //     enrollment
        //   );
        const studentInfo = await StudentQueries.getStudentProfileDetails(
          enrollment
        );

        if (!studentInfo) {
          return ResponseCodes.errorResponse(
            res,
            "failed to get student information"
          );
        }

        const resultObject = variables.reduce((acc, key) => {
          if (studentInfo[0][0].hasOwnProperty(key)) {
            acc[key] = studentInfo[0][0][key];
          }

          return acc;
        }, {});

        const externalData = resultObject;

        console.log(externalData)
    const response=await generate1(certificate.certificateFormatPath,externalData,enrollment,requestId)
    
    return ResponseCodes.successResponseWithData(
      res,
      "Certificate Request Status Updated",
      updateCount
    );
  },
];

module.exports = UpdateCertificateRequestStatus;
