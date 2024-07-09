const { DepartmentSchema } = require('../../helper/DbConnect.js')
const DepartmentQueries=require('../../Queries/DepartmentQueries.js')
const { body, validationResult } = require("express-validator");
const ResponseCodes = require("../../helper/ResponseCodes.js");

const DeleteDepartment = [


    // body('departmentId')
    //     .isNumeric()
    //     .notEmpty()
    //     .withMessage('Department Id is required')
    //     .custom(async (departmentId, { req }) => {
    //         const department = await DepartmentSchema.findOne({
    //             where: {
    //                 departmentId: departmentId
    //             }
    //         })

    //         if (!department) { 
    //             throw new Error('Department Id does not exist')
    //         }
    //         return true
    //     }
    // )
    //     .trim()
    //     .escape(),
  

    async (req, res) => {

        const errors = validationResult(req)

        if (!errors.isEmpty()) { 
            return ResponseCodes.errorResponse(res, errors.array())
        }
        

        const { departmentId } = req.params
    
        const updateDepartmentDetails = await DepartmentQueries.deleteDepartment(departmentId)

        if (!updateDepartmentDetails) { 
            return ResponseCodes.errorResponse(res, 'Error fetching departments')
        }

        return ResponseCodes.successResponseWithData(res, 'Departments Deleted successfully', updateDepartmentDetails)
    
    }
    
]

module.exports=DeleteDepartment;