const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

let verifyToken = function (request, response, next) {
  // console.log(request.headers);
  if (request.headers.authorization) {
    let verify = jwt.verify(request.headers.authorization, process.env.JWT_SEC);
    // console.log(verify);
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

let verifyToken = function (request, response, next) {
  // console.log(request.headers);
  if (request.headers.authorization) {
    let verify = jwt.verify(request.headers.authorization, process.env.JWT_SEC);
    // console.log(verify);

    if (verify) {
      request.body.userid = verify.id;
      // console.log(request.body);
      next();
    } else {
      response.status(401).json({
        message: "Unauthorized",
      });
    }
  } else {
    response.status(401).json({
      message: "Unauthorized",
    });
  }
};

module.exports = {
  verifyToken,
};
    if (verify) {
      request.body.userid = verify.id;
      // console.log(request.body);
      next();
    } else {
      response.status(401).json({
        message: "Unauthorized",
      });
    }
  } else {
    response.status(401).json({
      message: "Unauthorized",
    });
  }
};

module.exports = {
  verifyToken,
};