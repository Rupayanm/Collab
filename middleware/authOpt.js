const jwt = require("jsonwebtoken");
const config = require("config");

//Optional Auth
module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    next();
  } else {
    try {
      const decoded = jwt.verify(token, config.get("jwtSecret"));
      req.user = decoded.user;
    } finally {
      next();
    }
  }
};
