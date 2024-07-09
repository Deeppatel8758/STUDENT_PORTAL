const bcrypt = require("bcryptjs");

const ComparePassword = (enteredPassword, originalPassword) => {
  const isMatch = bcrypt.compare(enteredPassword, originalPassword);
  return isMatch;
};

module.exports = ComparePassword;
