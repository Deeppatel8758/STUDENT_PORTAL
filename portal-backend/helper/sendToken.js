const jwt = require("jsonwebtoken");

const SendToken = (user, res, statusCode) => {
  console.log(user);
  const token = jwt.sign({ id: user }, process.env.SECRET_KEY, {
    expiresIn: process.env.EXPIRY_SPAN,
  });

  return token;
};

module.exports = SendToken;
