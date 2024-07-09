const fs = require("fs");
const path = require("path");
const StudentQueries = require("../../Queries/StudentQueries");
const { body, validationResult } = require("express-validator");
const ResponseCodes = require("../../helper/ResponseCodes");
const DepartmentQueries = require("../../Queries/DepartmentQueries");

const filesFolderPath = path.join(__dirname, "../../uploads/"); // Replace 'files_folder' with the path to your folder containing the files

const GetCertificateRequestDocuments = [
  async (req, res) => {
    const requestId = req.params.requestId;

    const getApprovedCertificateDetails =
      await StudentQueries.getCertificateDetails(requestId);

    console.log(getApprovedCertificateDetails);
    const links = getApprovedCertificateDetails[0];

    const filePromises = [];

    links.forEach(({documentValue}) => {
      const filePath = path.join(filesFolderPath, documentValue);

      if (fs.existsSync(filePath)) {
        filePromises.push(
          new Promise((resolve, reject) => {
            fs.readFile(filePath, (err, fileData) => {
              if (err) {
                reject(err);
              } else {
                resolve({ name: documentValue, data: fileData });
              }
            });
          })
        );
      }
    });

    Promise.all(filePromises)
      .then((filesData) => {
        res.set({
          "Content-Type": "application/octet-stream",
          "Content-Disposition": `attachment; filename="files.zip"`,
        });
        res.json({ filesData, getApprovedCertificateDetails });
      })
      .catch((error) => {
        console.error("Error reading files:", error.message);
        return res.status(500).json({ error: "Error reading files." });
      });
  },
];

module.exports = GetCertificateRequestDocuments;
