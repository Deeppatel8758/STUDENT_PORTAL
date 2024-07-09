const AllSchemaAccess = require("../helper/DbConnect");
const { UploadedDocuments } = require("../helper/DbConnect");

const DocumentsQueries = {
  uploadDocuments: async function (documentsData) {
    try {
      console.log("DOCUMENT DATA : ", documentsData, "\n\n");
      const response = await UploadedDocuments.create(documentsData);
      return response;
    } catch (error) {
      throw error;
    }
  },
};
module.exports = DocumentsQueries;
