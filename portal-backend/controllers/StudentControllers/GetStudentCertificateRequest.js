const StudentQueries = require('../../Queries/StudentQueries');
const { body, validationResult } = require('express-validator');
const ResponseCodes = require('../../helper/ResponseCodes');

const GetStudentCertificateRequest = [
async (req, res) => {
        try {
    
            const getAllCertificateRequests = await StudentQueries.getAllCertificateRequests(req.user_info.username)
            
            if (getAllCertificateRequests) {
                return ResponseCodes.successResponseWithData(res, "Success", getAllCertificateRequests);
            }
            else {
                return ResponseCodes.errorResponse(res, "Error in getting certificate requests")
            }

        }
        catch (error) { 
            console.log(error.message)
            return ResponseCodes.errorResponse(res, "Error in getting certificate requests")
        }

    }

]
module.exports = GetStudentCertificateRequest