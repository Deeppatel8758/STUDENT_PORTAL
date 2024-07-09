const { body, validationResult } = require("express-validator");
const AdminQueries = require("../../Queries/AdminQueries");
const StudentQueries = require("../../Queries/StudentQueries");
const ResponseCodes = require("../../helper/ResponseCodes");

const CreateDynamicCertificate = [
  body("certificateName")
    .notEmpty()
    .withMessage("Certificate Name is Required."),
  body("requiredDocuments")
    .notEmpty()
    .withMessage("Documents Required is Required.")
    .custom(async (value, { req, res }) =>
    {
      console.log("required->",value)
      let count = 0;
      const docid = value.split(",");
      for (let i = 0; i < docid.length; i++)
      {
        const getDocumentDetails = await StudentQueries.getDocumentDetails(
          docid[i]
        );
        console.log(getDocumentDetails)
      
        if (!getDocumentDetails)
        {
          throw new Error(`Invalid document Id ${docid[i]}`);
        }
        count++;
      }

      if (count === docid.length)
      {
        return true;
      } else
      {
        return ResponseCodes.errorResponse(res, "Invalid Document Id");
      }
    })
    .escape(),

  body("certificateSerial")
    .notEmpty()
    .withMessage("Certificate Serial is Required.")
    .custom(async (value) =>
    {
      const checkCertificateSerial = await AdminQueries.checkCertificateSerial(
        value
      );
      if (checkCertificateSerial)
      {
        throw new Error("Certificate Serial already Exists");
      }
      return true;
    }),

  async (req, res) =>
  {
    try
    {
      const errors = validationResult(req);

      if (!errors.isEmpty())
      {
        return ResponseCodes.validationErrorWithData(
          res,
          "Validation Error",
          errors.array()
        );
      }

      if (!req.file)
      {
        return ResponseCodes.validationErrorWithData(
          res,
          "Certificate format file is required. And file must be .docx or .doc type.",
          null
        );
      }

      const { filename } = req.file;
      const {
        certificateName,
        requiredDocuments,
        certificateSerial,
        CertificateVariables,
      } = req.body;
      console.log("new requireddocuments->",requiredDocuments)

      const data = {
        certificatename: certificateName,
        documentsrequired: requiredDocuments,
        CertificateSerial: certificateSerial,
        certificateFormatPath: filename,
        CertificateVariables: CertificateVariables
      };
   
      
      const a = await AdminQueries.CreateDynamicCertificate(data);

      if (a === undefined || a === null)
      {
        return ResponseCodes.errorResponse(
          res,
          "Error Caught While Creating the Certificate."
        );
      } else
      {
        return ResponseCodes.successResponse(
          res,
          "Certificate Created Successfully."
        );
      }
    } catch (error)
    {
      console.log(error);
      return ResponseCodes.errorResponse(res, error);
    }
  },
];

module.exports = CreateDynamicCertificate;
