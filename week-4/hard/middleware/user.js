const jwt = require("jsonwebtoken");

function userMiddleware(req, res, next) {
  const token = req.cookies.authToken;

  if (!token) {
    res.status(401).json({
      msg: "unauthorized, token missing",
    });
  }

  try {
    const user = jwt.verify(token, "secret123");
    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({
      msg: "unauthorized access",
      error: error.message,
    });
  }
}

module.exports = userMiddleware;
