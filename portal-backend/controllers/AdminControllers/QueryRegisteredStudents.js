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
    .isIn(["1","2","3","4","5","6","7","8","9"])
    .withMessage("Please provide valid semester year")
    .toInt(),
  query("department")
    .optional() 
    .isNumeric()
    .withMessage("'department' parameter must be type Number.")
    .isIn(["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20"])
    .withMessage("Selected department is invalid.")
    .toInt(),
  async (req, res) => {
    console.log(SEMESTER);
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
    console.log(q);
    let students = await AdminQueries.GetRegisteredStudents(
      q.sem,
      q.department,
      SEMESTER,
      DEPARTMENT
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
