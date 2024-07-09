const { validationResult, query } = require("express-validator");
const ResponseCodes = require("../../helper/ResponseCodes");
const AdminQueries = require("../../Queries/AdminQueries");
const { Op } = require("sequelize");

const SEMESTER = Array.from({ length: 9 }, (el, idx) => idx + 1); // consider 9 == PASSOUT YEAR
const DEPARTMENT = Array.from({ length: 20 }, (el, idx) => idx + 1); // departmentId from 1-20

const QueryCertificateRequests = [
  query("enrollmentNo")
    .optional()
    .isLength({ min: 12, max: 12 })
    .withMessage(
      "Provide valid enrollmentNo, enrollmentNo must be 12 digits long."
    ),
  query("startDate")
    .optional()
    .isDate()
    .withMessage("Provide valid startDate, startDate must be Date string."),
  query("endDate")
    .optional()
    .isDate()
    .withMessage("Provide valid endDate, endDate must be Date string."),
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
    let start, end;

    if (!q.enrollmentNo && !q.startDate && !q.endDate) {
      return ResponseCodes.validationErrorWithData(
        res,
        "Provide atleast one parameter of enrollment, (startDate and endDate).",
        null
      );
    }

    const filter = {
      startDate: null,
      endDate: null,
      enrollmentNo: null,
    };

    if (q.startDate && q.endDate) {
      try {
        start = new Date(q.startDate);
        end = new Date(q.endDate);
        filter.startDate = start;
        filter.endDate = end;
      } catch (error) {
        return ResponseCodes.validationErrorWithData(
          res,
          "Invalid Date string provided in startDate, endDate parameters.",
          null
        );
      }
    }

    if (q.enrollmentNo) {
      filter.enrollmentNo = q.enrollmentNo;
    }

    let certificates = await AdminQueries.QueryCertificateRequests(filter);

    return ResponseCodes.successResponseWithData(res, "Certificate requests", {
      certificates: certificates || [],
    });
  },
];

module.exports = QueryCertificateRequests;
