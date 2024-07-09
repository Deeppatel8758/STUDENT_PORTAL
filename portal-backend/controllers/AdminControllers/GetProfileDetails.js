const ResponseCodes = require('../../helper/ResponseCodes')
const AdminQueries = require('../../Queries/AdminQueries')

const GetProfileDetails = [
    
    async (req, res) => { 

        const { username } = req.user_info
        const admin = await AdminQueries.GetProfileDetails(username)
        console.log("Profile Details->",admin)

        if (admin) { 
            return ResponseCodes.successResponseWithData(res, "Success", admin)
        }
        else {
            return ResponseCodes.errorResponse(res, "Error in getting profile details")
        }

    }



]

module.exports = GetProfileDetails;