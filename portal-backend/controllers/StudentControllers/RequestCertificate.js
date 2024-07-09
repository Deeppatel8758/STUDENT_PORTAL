const { body, validationResult } = require('express-validator');
const ResponseCodes = require('../../helper/ResponseCodes');
const StudentQueries = require('../../Queries/StudentQueries');
// const upload = require("../../helper/multerConfig");
const DocumentsQueries = require('../../Queries/DocumentQueries');

const {pool} = require('../../helper/DbConnect'); // Import MySQL2 with Promises support

//  to request a certificate
const RequestCertificate = [
    // File Handling
    
 body('enrollment').isInt().withMessage('Invalid Enrollment Number'),
 body('certificatetype').isInt().withMessage('Invalid Certificate Type'), 

    async (req, res) =>
    {
        try
        {        
            const connection = await pool.getConnection()
            
            await connection.beginTransaction()
            
            const errors = validationResult(req);

            if (!errors.isEmpty())
            {
                console.log("errors ", errors);
                return ResponseCodes.errorResponseWithData(res, "Validation Error", errors.array());
            }

            const fileData = req.files.map((file) => file.filename);
            console.log("fileData ", fileData);
 
            const {
                enrollment,
                certificatetype,
            } = req.body

            const keys = Object.keys(req.body)
            let allUploadEntry={}
            keys.forEach((keyUni) => {
                if (keyUni != "enrollment" && keyUni != "certificatetype" && keyUni!="imagesCategory" && keyUni!="inputCategory") {
                    allUploadEntry = {
                        ...allUploadEntry,
                        [keyUni]:req.body[keyUni]
                    }
                    
                }
            })
            
             console.log(allUploadEntry)
            
           
             const getDepartmentId=await StudentQueries.getCollegeDetails(enrollment)
            const data = {
                enrollment,
                certificatetype,
                departmentId:getDepartmentId.branch
            } 
            
            const {requestid} = await StudentQueries.RequestCertificate(data)
            
 
            const MakeEntryInUploadDocuments=await StudentQueries.UploadDocumentEntry(fileData,allUploadEntry,requestid,req.body.imagesCategory,req.body.inputCategory)            
               


            await connection.commit()
            return ResponseCodes.successResponseWithData(res, "Certificate Request Created", "response")
        } catch (error)
        {
            console.log("ERRRORRR ", error);
            return ResponseCodes.serverErrorWithData(res, "Error", error.message);
        }
    }
]

module.exports = RequestCertificate