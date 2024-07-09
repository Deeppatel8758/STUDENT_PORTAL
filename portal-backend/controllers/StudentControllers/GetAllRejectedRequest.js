const StudentQueries = require('../../Queries/StudentQueries');
const { body, validationResult } = require('express-validator');
const ResponseCodes = require('../../helper/ResponseCodes');



const GetAllRejectedRequest = [

    async (req, res) => { 
        try {
            const getRejectedRequest= await StudentQueries.getAllRejectedRequest(req.user_info.username)
            if (getRejectedRequest) {
                return ResponseCodes.successResponseWithData(res, "Success", getRejectedRequest);
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

module.exports = GetAllRejectedRequest