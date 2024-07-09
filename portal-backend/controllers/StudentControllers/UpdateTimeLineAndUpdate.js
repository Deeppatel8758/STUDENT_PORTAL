const {body,validationResult}=require('express-validator')
const StudentQueries = require('../../Queries/StudentQueries')
const {StudentCollegeDetails,StudentPersonalDetails}=require('../../helper/DbConnect')
const ResponseCodes=require('../../helper/ResponseCodes')
const {Sequelize}=require('sequelize')

const UpdateTimeLineAndUpdate = [

    async (req, res) => {
       
        const { username } = req.body

const SetAllowUpdateFalseAndSetLockInDurationNull=await StudentQueries.modifyAllUpdateAndTime(username)
        console.log(SetAllowUpdateFalseAndSetLockInDurationNull)
        if (SetAllowUpdateFalseAndSetLockInDurationNull[0]) {
            return ResponseCodes.successResponse(res,"Updated The Lock In TimeStamp")
        }
        else {
            return ResponseCodes.errorResponse(res,"Not Updated The Lock In Duration")
        }
        
    }

]

module.exports=UpdateTimeLineAndUpdate