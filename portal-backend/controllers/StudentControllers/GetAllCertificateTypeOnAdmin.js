const StudentQueries = require('../../Queries/StudentQueries');
const { body, validationResult } = require('express-validator');
const ResponseCodes = require('../../helper/ResponseCodes');

const GetAllCertificateTypeOnAdmin = [

    async (req, res) => {
    
        try {

            const getAllCertificateType = await StudentQueries.getAllCertificateTypeOnAdmin()
           if (getAllCertificateType.length>0) {
               
                const data = []
                
                for (let i = 0; i < getAllCertificateType.length; i++){

                    const dataObj = {
                        certificateDetails: '',
                        documentDetails:[]
                    }
                    dataObj.certificateDetails = getAllCertificateType[i];
                    const documentRequired = getAllCertificateType[i].documentsrequired.length > 0?getAllCertificateType[i].documentsrequired.split(','):[]
                    
                    for (let j = 0; j < documentRequired.length; j++){
                        const findDocumentDetails = await StudentQueries.findDocumentDetails(documentRequired[j]);
                        if (findDocumentDetails) {
                            dataObj.documentDetails.push(findDocumentDetails)
                        }    
                    }
                    data.push(dataObj)
                }

                return ResponseCodes.successResponseWithData(res, "Success", data);
        }
        else {
                return ResponseCodes.errorResponse(res, "Error in getting certificate requests")
            }

        }
        catch (error) { 
            console.log(error.message)
            return ResponseCodes.errorResponse(res, "Error in getting certificate requests")
        }
    
    }
    
]

module.exports = GetAllCertificateTypeOnAdmin;