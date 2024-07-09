const jwt = require("jsonwebtoken");

const successResponse = (res, msg) => {
  var data = {
    status: 1,
    code: 200,
    message: msg,
  };
  return res.status(200).json(data);
};

const sendToken = (user, res, statusCode) => {
  const token = jwt.sign(
    { id: user._id },
    "S2k3c0efrsfdsdsdfff2dsasdfdffasdasd@1q23w3e3ewe2",
    {
      expiresIn: "1d",
    },
  );
  const options = {
    expire: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    message: "User Login Successfully",
    token,
    user,
  });
};

const successResponseWithData = (res, msg, data) => {
  var resData = {
    status: 1,
    code: 200,
    message: msg,
    data: data,
  };
  return res.status(200).json(resData);
};

const errorResponse = (res, msg) => {
  var data = {
    status: 0,
    code: 500,
    message: msg,
  };
  return res.status(500).json(data);
};
const errorResponseWithData = (res, msg, data) => {
  var data = {
    status: 0,
    code: 500,
    message: msg,
    data,
  };
  return res.status(500).json(data);
};

const notFoundResponse = (res, msg) => {
  var data = {
    status: 0,
    code: 404,
    message: msg,
  };
  return res.status(404).json(data);
};

const AlreadyExists = (res, msg) => {
  var data = {
    status: 0,
    code: 400,
    message: msg,
  };
  return res.status(400).json(data);
};

const validationErrorWithData = (res, msg, data) => {
  var resData = {
    status: 0,
    code: 400,
    message: msg,
    data: data,
  };
  return res.status(400).json(resData);
};
const serverErrorWithData = (res, msg, data) => {
  var resData = {
    status: 0,
    code: 500,
    message: msg,
    data: data,
  };
  return res.status(500).json(resData);
};

const unauthorizedResponse = (res, msg) => {
  var data = {
    status: 0,
    message: msg,
    code: 401,
  };
  return res.status(401).json(data);
};
const forbiddenResponse = (res, msg = "Forbidden") => {
  var data = {
    code: 403,
    status: 0,
    message: msg,
  };
  return res.status(403).json(data);
};

module.exports = {
  successResponse,
  successResponseWithData,
  errorResponse,
  errorResponseWithData,
  notFoundResponse,
  AlreadyExists,
  validationErrorWithData,
  unauthorizedResponse,
  serverErrorWithData,
  forbiddenResponse,
  sendToken,
};
