const { DepartmentSchema } = require('../../helper/DbConnect.js')
const DepartmentQueries=require('../../Queries/DepartmentQueries.js')
const { body, validationResult } = require("express-validator");
const ResponseCodes = require("../../helper/ResponseCodes.js");

const UpdateDepartmentDetails = [
    body('oldDepId')
        .isNumeric()
        .notEmpty()
        .withMessage('Department Id is required')
        .custom(async (oldDepId, { req }) => {
            console.log(oldDepId)
            const department = await DepartmentSchema.findOne({
                where: {
                    departmentId: oldDepId
                }
            })

            if (!department) { 
                throw new Error('Department id does not exist')
            }
            return true
        }
    )
        .trim()
        .escape(),
    body('departmentId')
        .isNumeric()
        .notEmpty()
        .withMessage('Department Id is required')
        .custom(async (value, { req }) => {
            const department = await DepartmentSchema.findOne({
                where: {
                    departmentId: value
                }
            })
            if (req.body.oldDepId == value) {
                return true
            }

            if (department) { 
                throw new Error('Department Id  exist')
            }
            return true
        }
    )
        .trim()
        .escape(),
    body('departmentName')
        .isString()
        .notEmpty()
        .withMessage('Department Name is required')
        .trim()
        .escape()
    ,

    async (req, res) => {

        const errors = validationResult(req)
        
        if (!errors.isEmpty()) { 
            return ResponseCodes.errorResponse(res, errors.array())
        }
        

        const { departmentId, departmentName, oldDepId } = req.body
        console.log(oldDepId,departmentId,oldDepId)

        const updateDepartmentDetails = await DepartmentQueries.updateDepartment(departmentId,departmentName,oldDepId)

        if (!updateDepartmentDetails) { 
            return ResponseCodes.internalServerError(res, 'Error In Updating Details departments')
        }

        return ResponseCodes.successResponseWithData(res, 'Departments Details Updated successfully', updateDepartmentDetails)
    
    }
    
]

module.exports=UpdateDepartmentDetails;