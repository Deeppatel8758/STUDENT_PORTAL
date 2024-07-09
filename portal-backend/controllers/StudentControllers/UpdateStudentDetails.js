const {body,validationResult}=require('express-validator')
const StudentQueries = require('../../Queries/StudentQueries')
const {StudentCollegeDetails,StudentPersonalDetails}=require('../../helper/DbConnect')
const ResponseCodes=require('../../helper/ResponseCodes')
const {Sequelize}=require('sequelize')

const UpdateStudentDetails = [

    body('username')
        .notEmpty() 
        .withMessage('username is required')
        .isLength({ min: 5 })
        .withMessage('username must be at least 5 chars long')
        .custom(async(value, { req }) => { 

            await StudentQueries.checkUsername(value).then(user => {
                if (user) {
                    return Promise.reject('Username already in use');
                }
                return true
            })

            const findLockInDuration = await StudentCollegeDetails.findOne({
                where: {
                    username: value
                }
            })

            if(!findLockInDuration.dataValues.AllowUpdate || findLockInDuration.    dataValues.LockInDuration<new Date())
            {
                return  ResponseCodes.errorResponse(res, "Your Profile is locked for updation")
            }
        })
    
        .trim()
        .escape(),
    body('collegeDetails.email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('email must be valid')
        .trim()
        .escape(),
    body('collegeDetails.firstName')
        .notEmpty()
        .withMessage('firstName is required')
        .isLength({ min: 3 })
        .withMessage('firstName must be at least 3 chars long')
        .trim()
        .escape(),
    body('collegeDetails.middleName')
        .notEmpty()
        .withMessage('middleName is required')
        .isLength({ min: 3 })
        .withMessage('middleName must be at least 3 chars long')
        .trim()
        .escape(),
    body('collegeDetails.lastName')
        .notEmpty()
        .withMessage('lastName is required')
        .isLength({ min: 3 })
        .withMessage('lastName must be at least 3 chars long')
        .trim()
        .escape(),
    body('collegeDetails.enrollment')
        .notEmpty()
        .withMessage('enrollment is required')
        .isLength({ min: 12, max: 12 })
        .withMessage('enrollment must be at least 12 chars long')
        .trim()
        .escape(),
    body('collegeDetails.caste')
        .notEmpty()
        .withMessage('caste is required')
        .isIn(['OPEN', 'OBC', 'SC', 'ST', 'VJ', 'NT', 'OTHER'])
        .withMessage('caste must be valid')
        .trim()
        .escape(),
    body('collegeDetails.admissionCategory')
        .notEmpty()
        .withMessage('admissionCategory is required')
        .isIn(['OPEN', 'OBC', 'SC', 'ST', 'VJ', 'NT', 'OTHER'])
        .withMessage('admissionCategory must be valid')
        .trim()
        .escape(),
    body('collegeDetails.gender')
        .notEmpty()
        .withMessage("Gender Must be Provided")
        .isIn(["MALE", "FEMALE", "OTHERS"])
        .withMessage("Valid Gender Must be Provided")
        .trim()
        .escape(),
    body('collegeDetails.admissionYear')
        .notEmpty()
        .withMessage('admissionYear is required')
        .isInt({ min: 1948, max: 3000 })
        .withMessage('admissionYear must be valid')
        .trim()
        .escape(),
    body('collegeDetails.department')
        .notEmpty()
        .withMessage('department is required')
        
    
    
    
    

    ,
    async(req, res) => {
        const transction=await Sequelize.transaction();

        const errors = validationResult(req);

        if (!errors.isEmpty()) { 
            return ResponseCodes.errorResponseWithData(res, "Error", errors.array())
        }

        const { username, collegeDetails, personalDetails } = req.body

        
        

        
    }






]

module.exports=UpdateStudentDetails