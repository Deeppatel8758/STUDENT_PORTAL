const bcrypt = require("bcryptjs");

const EncryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

module.exports = EncryptPassword;
