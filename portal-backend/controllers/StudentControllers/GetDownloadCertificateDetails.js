const StudentQueries = require("../../Queries/StudentQueries");
const { body, validationResult } = require("express-validator");
const ResponseCodes = require("../../helper/ResponseCodes");
const fs = require("fs");
const path = require("path");
const { generate } = require("../../helper/generateCertificate");

const GetDownloadCertificateDetails = [
  async (req, res) => {
    try {
      const { requestId } = req.params;


      const filesFolderPath = path.join(
        __dirname,
        "../../uploads/certificateFormat/"
      );

      //   check validity of requestId
      const checkRequestId = await StudentQueries.checkRequestId(requestId);
      if (!checkRequestId) {
        return ResponseCodes.errorResponse(res, "Invalid Request Id");
      }

      const certificateRequest =
        await StudentQueries.getApprovedCertificateDetails(requestId);

      const certificateType = certificateRequest.certificatetype;
      const enrollment = certificateRequest.enrollment;
      console.log(enrollment, "enrollment");


      if (certificateRequest) {
        const certificate = await StudentQueries.getCertificateInfo(
          certificateType
        );

        const certificateDocumentVariables = certificate.CertificateVariables;
        const certificateVariables = certificateDocumentVariables.split(",");
        const variables = [...certificateVariables, "enrollment"];
        console.log(variables, "variables");

        const studentInfo = await StudentQueries.getStudentProfileDetails(
          enrollment
        );

        console.log(studentInfo, "studentInfo");
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
        console.log(resultObject, "resultObject");


        const externalData = resultObject;

        const filePromises = [];


        const pdfbuffer = await generate(
          certificate.certificateFormatPath,
          externalData,
          res
        );
        console.log(pdfbuffer);
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="certificate.pdf"');


        res.send(pdfbuffer);
      } else {
        return ResponseCodes.errorResponse(
          res,
          "Error in getting certificate details"
        );
      }
    } catch (error) {
      console.log(error.message);
      return ResponseCodes.errorResponse(
        res,
        "Error in getting certificate details"
      );
    }
  },
];

module.exports = GetDownloadCertificateDetails;