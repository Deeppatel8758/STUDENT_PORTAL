const jwt = require("jsonwebtoken");
const ResponseCodes = require("../helper/ResponseCodes");

const TokenVerificationAdminDepartment = async (req, res, next) => {
  try {
    const Bearer = req.header("Authorization");

    if (Bearer) {
      const token = Bearer.replace("Bearer ", "");

      if (!token) {
        return ResponseCodes.errorResponse(
          res,
          "Token Not Found Please Login First",
        );
      }

      const decodeddata = jwt.verify(token, process.env.SECRET_KEY);

      req.user_info = decodeddata.id;

      next();
    } else {
      return ResponseCodes.errorResponse(res, "Token Not Valid");
    }
  } catch (e) {
    return ResponseCodes.errorResponse(res, e.message);
  }
};

module.exports = TokenVerificationAdminDepartment;
