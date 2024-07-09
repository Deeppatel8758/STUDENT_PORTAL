const { body, validationResult } = require('express-validator');
const ResponseCodes= require('../../helper/ResponseCodes');
const StudentQueries = require('../../Queries/StudentQueries');
const DepartmentQueries = require('../../Queries/DepartmentQueries');
const AdminQueries = require('../../Queries/AdminQueries');

const DepartmentVerification = [
     body('id').isInt().withMessage("Invalid ID"),
    body('type').isInt().withMessage("Invalid Type"),
    async (req, res) => { 

        const errors = validationResult(req);

        const { id, type } = req.body;

        const AllDepartments=await DepartmentQueries.GetAllDepartments();
        return ResponseCodes.successResponseWithData(res, "Success",AllDepartments)
        
        
    }
]

module.exports = DepartmentVerification