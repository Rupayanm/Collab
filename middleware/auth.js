const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  let jwtSecret = "";

  if (process.env.NODE_ENV === "production") {
    jwtSecret = process.env.jwtSecret;
  } else {
    const config = require("config");
    jwtSecret = config.get("jwtSecret");
  }

  if (!token) {
    return res.status(401).json({ msg: "No token, authorizatio denied" });
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
