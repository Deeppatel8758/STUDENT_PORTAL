const StudentQueries = require('../../Queries/StudentQueries');
const { body, validationResult } = require('express-validator');
const ResponseCodes = require('../../helper/ResponseCodes');

const DeleteCertificateRequest = [

    body('requestId')
        .notEmpty()
        .withMessage('requestId is required')
        .trim()
        .custom((value, { req }) => { 
           
            return StudentQueries.checkRequestId(value).then(request => {
                if (!request) {
                    return Promise.reject('Invalid Request Id');
                }
                return true
            })

        })
        .escape(),
    







async (req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return ResponseCodes.validationErrorWithData(res, "Invalid Data", errors.array())
        }
        const { requestId } = req.body
    
            const deleteRequest = await StudentQueries.deleteRequest(requestId)
            
            if (deleteRequest) {
                return ResponseCodes.successResponseWithData(res, "Success", deleteRequest);
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
module.exports = DeleteCertificateRequest