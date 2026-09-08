const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) => {
  const tokenHeader = req.headers["authorization"];

  //   req.body.token || req.query.token ||

  if (!tokenHeader) {
    return res.status(403).send("A token is required for authentication");
  }
  const token = tokenHeader.split("Bearer ")[1];
  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;
