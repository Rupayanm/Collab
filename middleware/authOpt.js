const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtSecret = process.env.jwtSecret;

//Optional Auth
module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch {
    next();
  }
};
