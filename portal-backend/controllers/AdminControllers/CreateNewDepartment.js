const { DepartmentSchema } = require('../../helper/DbConnect.js')
const DepartmentQueries=require('../../Queries/DepartmentQueries.js')
const { body, validationResult } = require("express-validator");
const ResponseCodes = require("../../helper/ResponseCodes");




const   CreateNewDepartment = [

    body('departmentName').isString().notEmpty().withMessage('Department Name is required').trim().escape(),
    body('departmentId').isNumeric().notEmpty().withMessage('Department Id is required').
        custom(async (departmentId, { req }) => { 
            const department = await DepartmentSchema.findOne({
                where: {
                    departmentId: departmentId
                }
            })

            if (department) {
                throw new Error('Department Id already exists')
            }
            return true
        }).trim().escape(),
    
    async (req, res) => {
        
        const errors = validationResult(req)
        
        if (!errors.isEmpty()) { 
            return ResponseCodes.validationErrorWithData(res, errors.array())
        }

        const { departmentName, departmentId } = req.body

        const createNewDepartment = await DepartmentQueries.addNewDepartment({
            departmentName: departmentName,
            departmentId: departmentId
        })

        if(!createNewDepartment){
            return ResponseCodes.internalServerError(res, 'Error creating new department')
        }

        return ResponseCodes.successResponse(res, 'Department created successfully')

    }
    
]

module.exports=CreateNewDepartment;