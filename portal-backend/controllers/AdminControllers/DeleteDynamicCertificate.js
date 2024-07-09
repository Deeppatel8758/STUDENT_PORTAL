const { body, validationResult } = require("express-validator");
const AdminQueries = require("../../Queries/AdminQueries");
const StudentQueries = require('../../Queries/StudentQueries')
const ResponseCodes = require("../../helper/ResponseCodes");

const docTypes = ["STRING", "INTEGER", "FLOAT", "DATEONLY", "FILE", "BIGINT"];

const isValidCategoryName = (value) => {
    return /^[A-Za-z ]+$/.test(value);
};

const DeleteDynamicCertificate = [

    // body('id')
    //     .notEmpty().withMessage("Certificate Name is Required.")
    //     .custom(async (value) => { 
    //         const checkCertificateSerial = await AdminQueries.checkForDynamicId(value)
    //         if (!checkCertificateSerial) {
    //             throw new Error('Certificate Serial Does Not Exists');
    //         }
    //         return true
    //     })
    // ,    

    async(req, res) => {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return ResponseCodes.validationErrorWithData(res, "Validation Error", errors.array());
        }

        try {

            const {
               id
            }=req.params;
            console.log(id)

            const a = await AdminQueries.DeleteDynamicCertificate(id)

            if (a === undefined || a === null) {
                return ResponseCodes.errorResponse(res, "Error Caught While Creating the Certificate.");
            }
            else {
                return ResponseCodes.successResponse(res, "Certificate Deleted Successfully.");
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

module.exports = DeleteDynamicCertificate;