const ResponseCodes = require("../helper/ResponseCodes");

const RoleValidation = (allowed = ["*"]) => {
  return (req, res, next) => {
    const user = req.user_info;

    if (allowed[0] === "*" || allowed.indexOf(user.role) !== -1) {
      next();
    } else {
      return ResponseCodes.forbiddenResponse(
        res,
        403,
        "You are not allowed to access this route",
      );
    }
  };
};

module.exports = RoleValidation;
