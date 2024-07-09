const { DepartmentSchema } = require('../../helper/DbConnect.js')
const DepartmentQueries=require('../../Queries/DepartmentQueries.js')
const { body, validationResult } = require("express-validator");
const ResponseCodes = require("../../helper/ResponseCodes.js");

const ReadAllDepartments = [

    async (req, res) => {
    
        const getAllDepartments = await DepartmentQueries.getAllDepartments()

        if (!getAllDepartments) { 
            return ResponseCodes.internalServerError(res, 'Error fetching departments')
        }

        return ResponseCodes.successResponseWithData(res, 'Departments fetched successfully', getAllDepartments)
    
    }
    
]

module.exports=ReadAllDepartments;