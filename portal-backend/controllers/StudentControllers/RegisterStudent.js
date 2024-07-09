const StudentQueries = require("../../Queries/StudentQueries");
const DepartmentQueries = require("../../Queries/DepartmentQueries");
const { body, validationResult } = require("express-validator");
const ResponseCodes = require("../../helper/ResponseCodes");
const { sequelize } = require("sequelize");
const upload = require("../../helper/multerConfig");
const EncryptPassword = require("../../helper/EncryptPassword");
const CreateNewStudent = [
   // file handling
  body("contactNumber")
    .notEmpty()
    .withMessage("contactNumber is required")
    .isLength({ min: 10, max: 10 })
    .withMessage("contactNumber must be 10 digits")
    .custom(async (value) => {
      return DepartmentQueries.checkContactNumber(value).then((user) => {
        if (user) {
          return Promise.reject("contactNumber already in use");
        } else return true;
      });
    }),
  /* body('role').notEmpty().withMessage('role is required')
        .isIn(['3']).withMessage('role must be 3'), */
  body("departmentid")
    .notEmpty()
    .withMessage("departmentid is required")
    .isIn([
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
    ])
    .withMessage("departmentid must be in 1 to 17"),
  body("firstName").notEmpty().withMessage("first name is required"),
  body("middleName").notEmpty().withMessage("middle name is required"),
  body("lastName").notEmpty().withMessage("last name is required"),
  body("enrollment")
    .notEmpty()
    .withMessage("enrollment no is required")
    .isLength(12)
    .withMessage("minimum 12 numbers are required in enrollment no"),
  body("caste").notEmpty().withMessage("caste is required"),
  body("admissionCategory")
    .notEmpty()
    .withMessage("admission category is required"),
  body("gender").notEmpty().withMessage("gender is required"),
  body("admissionYear").notEmpty().withMessage("admission year is required"),
  body("semester").notEmpty().withMessage("semester is required"),
  body("branch").notEmpty().withMessage("branch is required"),
  body("course").notEmpty().withMessage("course is required"),
  body("religion").notEmpty().withMessage("religion is required"),
  body("verifiedDepartment")
    .notEmpty()
    .withMessage("verified department is required"),
  body("verifiedStudentSection")
    .notEmpty()
    .withMessage("verified student section is required"),
  body("contactNumber").notEmpty().withMessage("contact number is required"),
  body("aadhar").notEmpty().withMessage("Aadhar Number must be filled").isLength(12).withMessage("Aadhar Number must be valid"),
  body("voterId").notEmpty().withMessage("voter Id is required").isLength(10).withMessage("voter Id must be valid"),
  body("dob").notEmpty().withMessage("date of birth is required"),
  body("bloodGroup").notEmpty().withMessage("blood group is required"),
  body("residentalAddress")
    .notEmpty()
    .withMessage("residental address is required"),
  body("residentalCity").notEmpty().withMessage("residental city is required"),
  body("residentalState")
    .notEmpty()
    .withMessage("residental state is required"),
  body("reisentalCountry")
    .notEmpty()
    .withMessage("residental country is required"),
  body("residentalPincode")
    .notEmpty()
    .withMessage("residental pincode is required")
    .isLength(6)
    .withMessage("residental pincode must be valid"),
  body("permanentAddress1")
    .notEmpty()
    .withMessage("permanent address 1 is required"),
  body("permanentAddress2")
    .notEmpty()
    .withMessage("permanent address 2 is required"),
  body("permanentCity").notEmpty().withMessage("permanent city is required"),
  body("permanentState").notEmpty().withMessage("permanent state is required"),
  body("permanentCountry")
    .notEmpty()
    .withMessage("permanent country is required"),
  body("permanentPincode")
    .notEmpty()
    .withMessage("permanent pincode is required")
    .isLength(6)
    .withMessage("permanent pincode must be valid"),
  body("sscyear").notEmpty().withMessage("sscyear is required"),
  body("sscpr").notEmpty().withMessage("ssc pr is required"),
  body("hscyear").notEmpty().withMessage("hsc year is required"),
  body("hscpr").notEmpty().withMessage("hsc pr is required"),
  body("fathername").notEmpty().withMessage("father name is required"),
  body("fathercontactNumber").notEmpty().withMessage("Father`s contactNumber is required")
  .isLength(10)
  .withMessage("Father`s contactNumber must be 10 digits")
  .custom(async (value, {req}) => {
    if(value === req.body.contactNumber){
      return Promise.reject("Please Enter Parents Contact Number")
    }
  }),
  body("mothername").notEmpty().withMessage("mother name is required"),
  body("fatheroccupation")
    .notEmpty()
    .withMessage("father occupation is required"),
  // body('fathercontactNumber').notEmpty().withMessage('father contact number is required'),
  body("officeAdd1")
    .notEmpty()
    .withMessage("office address 1 number is required"),
  // body('officeAdd2').notEmpty().withMessage('office address 2 number is required'),
  body("officeCity").notEmpty().withMessage("office city number is required"),
  body("officeState").notEmpty().withMessage("office state number is required"),
  body("officeCountry").notEmpty().withMessage("office country is required"),
  body("officePincode").notEmpty().withMessage("office pincode is required").isLength(6).withMessage("PinCode must be valid"),
  body("motheroccupation")
    .notEmpty()
    .withMessage("mother occupation is required"),
  body("familyincome").notEmpty().withMessage("family income is required"),

  async (req, res) => {
    let {
      enrollment,
      caste,
      admissionCategory,
      gender,
      admissionYear,
      semester,
      branch,
      course,
      religion,
      verifiedDepartment,
      verifiedStudentSection,
      contactNumber,
      aadhar,
      voterId,
      dob,
      bloodGroup,
      residentalCity,
      residentalState,
      reisentalCountry,
      residentalPincode,
      permanentAddress1,
      permanentAddress2,
      permanentCity,
      permanentState,
      permanentCountry,
      permanentPincode,
      sscyear,
      sscpr,
      hscyear,
      hscpr,
      fathername,
      mothername,
      fatheroccupation,
      fathercontactNumber,
      officeAdd1,
      officeAdd2,
      officeCity,
      officeState,
      officeCountry,
      officePincode,
      motheroccupation,
      familyincome,
      departmentid,
      residentalAddress,
    } = req.body;

    let studentCollegeObj = {
      enrollment,
      caste,
      admissionCategory,
      gender,
      admissionYear,
      semester,
      branch,
      course,
      religion,
      verifiedDepartment,
      verifiedStudentSection,
      departmentid,
    };

    let studentPersonalObj = {
      enrollment,
      contactNumber,
      voterId,
      aadhar,
      dob,
      bloodGroup,
      residentalAddress,
      residentalCity,
      residentalState,
      reisentalCountry,
      residentalPincode,
      permanentAddress1,
      permanentAddress2,
      permanentCity,
      permanentState,
      permanentCountry,
      permanentPincode,
      sscyear,
      sscpr,
      hscyear,
      hscpr,
      fathername,
      mothername,
      fatheroccupation,
      fathercontactNumber,
      officeAdd1,
      officeAdd2,
      officeCity,
      officeState,
      officeCountry,
      officePincode,
      motheroccupation,
      familyincome,
    };

    try {
      console.log(req.files);
      // profile and url upload code
      const profile = req.files[0];

      const profile_path = profile.filename;
      const signature = req.files[1];
      const signature_path = signature.filename;
      studentCollegeObj["profileUrl"] = profile_path;
      studentCollegeObj["signatireUrl"] = signature_path;

      // console.log('--')
      // let t = await sequelize.transaction();
      // console.log('--')
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return ResponseCodes.errorResponseWithData(
          res,
          "Validation Error",
          errors.array()
        );
      }
      const newUser = await StudentQueries.createNewStudent(
        studentCollegeObj,
        studentPersonalObj
        );
        
      return ResponseCodes.successResponse(
        res,
        (msg = "student added successfully!")
      );
      // const a = await transaction.commit();
      // if (a === undefined)
      // {
      //     return ResponseCodes.successResponse(res, "data saved successfully");
      // }
      // else
      // {
      //     return ResponseCodes.errorResponse(
      //         res,
      //         "error encoutered while saving the data"
      //     );
      // }
    } catch (err) {
      // await transaction.rollback();
      console.log(err);
      return ResponseCodes.errorResponse(res, "Error in creating user");
    }
  },
];

module.exports = CreateNewStudent;
