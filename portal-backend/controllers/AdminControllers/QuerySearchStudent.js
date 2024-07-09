const { query, validationResult } = require("express-validator");
const ResponseCodes = require("../../helper/ResponseCodes");
const AdminQueries = require("../../Queries/AdminQueries");

const allowedCategory = ["OPEN", "OBC", "SC", "ST", "VJ", "NT", "OTHER"];
const genderList = ["MALE", "FEMALE", "OTHER"];

const QuerySearchStudent = [
  query("enrollment")
    .optional()
    .isInt()
    .withMessage("Enrollment must be an Integer"),

  query("semester")
    .optional()
    .isInt()
    .withMessage("Semester must be an Integer")
    .toInt()
    .isInt({ min: 0, max: 8 })
    .withMessage("Semester must be between 0 to 8"),

  query("admissionYear")
    .optional()
    .isInt()
    .withMessage("Admission Year must be an Integer"),

  query("admissionCategory")
    .optional()
    .isString()
    .withMessage("Admission Category must be String")
    .custom((value) => {
      if (!allowedCategory.includes(value)) {
        throw new Error(
          `Admission Category must be one of the specified values: ${allowedCategory.join(
            ", "
          )}.`
        );
      }
      return true;
    }),

  query("caste")
    .optional()
    .isString()
    .withMessage("Caste must be String")
    .custom((value) => {
      if (!allowedCategory.includes(value)) {
        throw new Error(
          `Cast must be one of the specified values: ${allowedCategory.join(
            ", "
          )}.`
        );
      }
      return true;
    }),

  query("gender")
    .optional()
    .isString()
    .withMessage("Gender must be String")
    .custom((value) => {
      if (!genderList.includes(value)) {
        throw new Error(
          `Gender must be one of the specified values: ${genderList.join(
            ", "
          )}.`
        );
      }
      return true;
    }),

  async (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      try {
        const {enrollment, semester, admissionYear, admissionCategory, caste, gender} = req.query;

        const query = {
            where: {},
        };

        if(enrollment != undefined){
            query.where.enrollment = enrollment;
        }
        if(semester != undefined){
            query.where.semester = semester;
        }
        if(admissionYear != undefined){
            query.where.admissionYear = admissionYear;
        }
        if(admissionCategory != undefined){
            query.where.admissionCategory = admissionCategory;
        }
        if(caste != undefined){
            query.where.caste = caste;
        }
        if(gender != undefined){
            query.where.gender = gender;
        }


        const students = await AdminQueries.GetSearchStudent(query);

        return ResponseCodes.successResponseWithData(
            res,
            "Success! students as per enrollment, sem, admission year and category, caste and gender",
            {
                students: students || [],
            }
        )
      } catch (error) {
        console.error(error.message);
        return ResponseCodes.errorResponse(res,
          error.hasOwnProperty('errors') 
              ? error.errors[0].message
              : error.message
        );
      }
    }
    else {
      return ResponseCodes.validationErrorWithData(
        res,
        errors.errors[0].msg,
        errors.errors[0]
      );
    }
  },
];

module.exports = QuerySearchStudent;
