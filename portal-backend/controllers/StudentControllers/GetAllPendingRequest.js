const StudentQueries = require('../../Queries/StudentQueries');
const { body, validationResult } = require('express-validator');
const ResponseCodes = require('../../helper/ResponseCodes');



const GetAllPendingRequest = [

    async (req, res) => { 
        try {
            const getApprovedCertificate= await StudentQueries.getAllPendingRequest(req.user_info.username)
            if (getApprovedCertificate) {
                return ResponseCodes.successResponseWithData(res, "Success", getApprovedCertificate);
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

module.exports = GetAllPendingRequest