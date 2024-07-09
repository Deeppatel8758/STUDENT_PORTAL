const StudentQueries = require('../../Queries/StudentQueries');
const { body, validationResult } = require('express-validator');
const ResponseCodes = require('../../helper/ResponseCodes');



const GetCertificateOnRequestType = [

    async (req, res) => { 
        try {
            const getAllCertificateRequestOnType = await StudentQueries.getAllCertificateRequestOnType(req.user_info.username, req)
            console.log()
            if (getAllCertificateRequestOnType) {
                return ResponseCodes.successResponseWithData(res, "Success", getAllCertificateRequestOnType);
            }
            else {
                return ResponseCodes.errorResponse(res, "Error in getting certificate details")
            }
        }
        catch (error) { 
            console.log(error.message)
            return ResponseCodes.errorResponse(res, "Error in getting certificate details")
        }
    }




]

module.exports = GetCertificateOnRequestType