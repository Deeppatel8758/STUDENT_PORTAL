const { param, validationResult } = require("express-validator");
const ResponseCodes = require("../../helper/ResponseCodes");
const DepartmentQueries = require("../../Queries/DepartmentQueries");
const path = require('path')
const fs=require('fs')
const GetStudentProfileData = [
  // validate enrollment
  param("enrollment")
    .isLength({ min: 12, max: 12 })
    .withMessage("Invalid Enrollment Number"),
  async (req, res) => {
    const errors = validationResult(req);
    const filePath=path.join(__dirname,"../../uploads/")
    // checking for errors
    if (!errors.isEmpty()) {
      return ResponseCodes.validationErrorWithData(
        res,
        "Invalid Data",
        errors.array()
      );
    }


    // enrollment from URL params
    const { enrollment } = req.params;
    console.log(enrollment)
    // getting student data
    const studentData = await DepartmentQueries.getStudentData(enrollment, req.user_info.branch);
    console.log(studentData)





    
    const links = []
    links.push(studentData.studentCollegeDetails.profileUrl)
    links.push(studentData.studentCollegeDetails.signatireUrl)

    // success response but student not found
    if (studentData === null) {
      return ResponseCodes.errorResponse(
        res,
        `No Student With Enrollment ${enrollment} found`
      );
    }


  const filePromises = [];
    
    links.forEach((fileName) => {
      if (fileName) {

        const filePaths = path.join(filePath, fileName);
        console.log(filePath)
  
        if (fs.existsSync(filePaths)) {
            filePromises.push(
                new Promise((resolve, reject) => {
                    fs.readFile(filePaths, (err, fileData) => {
                        if (err) {
                            reject(err);
                        } else {
                          console.log(fileData)
                            resolve({ name: fileName, data: fileData });
                        }
                    });
                })
            );
        }
      }
        });
    
        Promise.all(filePromises)
          .then((filesData) => {
              console.log(filesData)
                res.set({
                    'Content-Type': 'application/octet-stream',
                    'Content-Disposition': `attachment; filename="files.zip"`,
                });
                return ResponseCodes.successResponseWithData(res,"Profile",{filesData,studentData})
            })
            .catch((error) => {
                console.error('Error reading files:', error.message);
                return res.status(500).json({ error: 'Error reading files.' });
            }); 


/*     // studentData contains both studentCollegeDetails and studentPersonalDetails
    return ResponseCodes.successResponseWithData(res, "Success", studentData);
 */



  },
];

module.exports = GetStudentProfileData;
