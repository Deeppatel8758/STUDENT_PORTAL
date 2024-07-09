const dotenv = require("dotenv");
dotenv.config();

const ROLES = {
  ADMIN: "1",
  DEPARTMENT: "2",
  STUDENT: "3",
};

module.exports = {
  ROLES,
};
