const DepartmentQueries = require('../../Queries/DepartmentQueries');
const { body, validationResult } = require('express-validator');
const ResponseCodes=require('../../helper/ResponseCodes');
const {sequelize}=require('sequelize');
const EncryptPassword=require('../../helper/EncryptPassword');
const CreateNewUser = [

    body('username').notEmpty().withMessage('username is required')
        .isLength({ min: 5 }).withMessage('username must be atleast 5 characters')
        .custom(async (value) => { 
            return DepartmentQueries.checkUsername(value).then(user => {
                if (user) {
                    return Promise.reject('username already in use');
                }
                else
                    return true;
            });
        })
    ,
    body('password').notEmpty().withMessage('password is required')
        .isLength({ min: 8 }).withMessage('password must be atleast 8 characters'),
    body('name').notEmpty().withMessage('name is required'),
    body('contactNumber').notEmpty().withMessage('contactNumber is required')
        .isLength({ min: 10, max: 10 }).withMessage('contactNumber must be 10 digits')
        .custom(async(value) => {
            
            return DepartmentQueries.checkContactNumber(value).then(user => {
                if (user) {
                    return Promise.reject('contactNumber already in use');
                }
                else
                    return true;
            });

        })
    
    ,
    body('email').notEmpty().withMessage('email is required')
        .isEmail().withMessage('email is not valid')
        .custom(async (value) => { 
            return DepartmentQueries.checkEmail(value).then(user => {
                if (user) {
                    return Promise.reject('email already in use');
                }
                else
                    return true;
            });
        })
    ,
    body('role').notEmpty().withMessage('role is required')
        .isIn(['1', '2']).withMessage('role must be 1 or 2'),
    body('departmentid').notEmpty().withMessage('departmentid is required')
        .isIn(['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17']).withMessage('departmentid must be in 1 to 17'),
      async (req, res) => {
       
        try { 
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return ResponseCodes.errorResponseWithData(
                    res,
                    "Validation Error",
                    errors.array()
                );
            }
            const data = req.body;
            data.password=EncryptPassword(data.password);
            const newUser = await DepartmentQueries.createNewUser(data);
            if (newUser) {
                return ResponseCodes.successResponseWithData(
                    res,
                    "User Created Successfully",
                    newUser
                );
            }
            else {
                return ResponseCodes.errorResponse(
                    res,
                    "Error in creating user"
                );
            }
        }

        catch (err) {
            console.log(err);
            return ResponseCodes.errorResponse(
                res,
                "Error in creating user"
            );
        }
    }

]

module.exports = CreateNewUser;