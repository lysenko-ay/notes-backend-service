const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    res.status(401).json({ error: "missing token" });
    return;
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      res.status(401).json({ error: "invalid token" });
      return;
    }

    req.userId = decoded.id;
    next();
  });
};

module.exports = verifyToken;
