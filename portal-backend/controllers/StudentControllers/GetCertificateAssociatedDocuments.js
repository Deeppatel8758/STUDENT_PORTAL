const ResponseCodes = require('../../helper/ResponseCodes')
const StudentQueries = require('../../Queries/StudentQueries')
const { body, validationResult } = require('express-validator')



const GetCertificateAssociatedDocuments = [

    async (req, res) => { 
        try {
            const { id } = req.params
            let docid = []
            const respnseDocs=[]
            const checkDynamicCertiId=await StudentQueries.checkDynamicCertiId(id)

            if (!checkDynamicCertiId) { 
                return ResponseCodes.errorResponse(res, "Invalid Certificate Id")
            }

            const findDocumentsAssociated = await checkDynamicCertiId.dataValues.documentsrequired
            
            if (findDocumentsAssociated) { 
                docid=findDocumentsAssociated.split(',')
            }

            for (let i = 0; i < docid.length; i++) { 
                const getDocumentDetails = await StudentQueries.getDocumentDetails(docid[i])
                if (getDocumentDetails) { 
                    respnseDocs.push(getDocumentDetails)
                }
            }

            if (respnseDocs.length > 0) { 
                return ResponseCodes.successResponseWithData(res, "Success", respnseDocs)
            }
            else {
                return ResponseCodes.errorResponse(res, "Error in getting certificate details")
            }
        }
        catch (error) { 
            console.log(error.message)
            return ResponseCodes.errorResponse(res, "Error in getting certificate details")
        }
    }




]

module.exports=GetCertificateAssociatedDocuments;