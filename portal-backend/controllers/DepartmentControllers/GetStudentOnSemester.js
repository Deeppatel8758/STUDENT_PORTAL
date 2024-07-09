const { validationResult, query } = require("express-validator");
const ResponseCodes = require("../../helper/ResponseCodes");
const StudentQueries = require("../../Queries/StudentQueries");
const DepartmentQueries = require("../../Queries/DepartmentQueries");
const AdminQueries = require("../../Queries/AdminQueries");

const SEMESTER = Array.from({ length: 9 }, (el, idx) => idx + 1); // consider 9 == PASSOUT YEAR
const DEPARTMENT = Array.from({ length: 20 }, (el, idx) => idx + 1); // departmentId from 1-20

const QueryRegisteredStudents = [
  query("sem")
    .optional()
    .isNumeric()
    .withMessage("'sem' parameter must be type Number.")
    .isIn(SEMESTER)
    .withMessage("Please provide valid semester year")
    .toInt(),
  
  async (req, res) => {
    const validation = validationResult(req);
    if (validation.errors?.length > 0) {
      const validationErrors = validation.errors.map((el) => {
        return {
          msg: el.msg,
          param: el.path,
        };
      });

      return ResponseCodes.validationErrorWithData(
        res,
        "query field validation error",
        validationErrors
      );
    }

    const q = req.query;

    let students = await AdminQueries.GetRegisteredStudents(
      q.sem,
      req.user_info.departmentid
    );

    return ResponseCodes.successResponseWithData(
      res,
      "Success! students as per semester and department queries",
      {
        students: students || [],
      }
    );
  },
];

module.exports = QueryRegisteredStudents;
