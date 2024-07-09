const { body, validationResult } = require("express-validator");
const AdminQueries = require("../../Queries/AdminQueries");
const StudentQueries = require('../../Queries/StudentQueries')
const ResponseCodes = require("../../helper/ResponseCodes");

const docTypes = ["STRING", "INTEGER", "FLOAT", "DATEONLY", "FILE", "BIGINT"];

const isValidCategoryName = (value) => {
    return /^[A-Za-z ]+$/.test(value);
};

const UpdateDynamicCertificate = [

    body('id')
        .notEmpty().withMessage("Certificate Name is Required.")
        .custom(async (value) => {
            const checkCertificateSerial = await AdminQueries.checkForDynamicId(value)
            if (!checkCertificateSerial) {
                throw new Error('Certificate Serial Does Not Exists');
            }
            return true
        })
    ,
    body('certificatename')
        .notEmpty().withMessage("Certificate Name is Required."),
    body('documentsrequired')
        .notEmpty().withMessage("Documents Required is Required.")
        .custom(async (value) => {
            let count = 0
            const docid = value.split(',')
            for (let i = 0; i < docid.length; i++) {
                const getDocumentDetails = await StudentQueries.getDocumentDetails(docid[i])
                if (!getDocumentDetails) {
                    throw new Error('Invalid Document Id');
                }
                count++
            }

            if (count === docid.length) {
                return true
            }
            else {
                throw new Error('Invalid Document Id');
            }
        }
    ).escape(),

    body('CertificateSerial')
        .notEmpty().withMessage("Certificate Serial is Required.")
        .custom(async (value) => {
            const checkCertificateSerial = await AdminQueries.checkCertificateSerial(value)
            if (checkCertificateSerial) {
                throw new Error('Certificate Serial Does Not Exists');
            }
            return true
            
        })
    ,
            
    
  
    

    async(req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return ResponseCodes.validationErrorWithData(res, "Validation Error", errors.array());
        }

        try {

            const data=req.body;


            const a = await AdminQueries.UpdateDynamicCertificate(data)

            if (a === undefined || a === null) {
                return ResponseCodes.errorResponse(res, "Error Caught While Creating the Certificate.");
            }
            else {
                return ResponseCodes.successResponse(res, "Certificate Updated Successfully.");
            }

        }
        catch (error) {
            console.log(error);
            return ResponseCodes.errorResponse(res,
                error.hasOwnProperty('errors') 
                    ? error.errors[0].message
                    : error.message
            );
        }

      
    }
];

module.exports = UpdateDynamicCertificate;