const { verifyToken } = require("../services/auth");

function restrictToLoggedinUserOnly(req, res, next) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ msg: "Unauthorized: No token" });
    }

    const user = verifyToken(token);

    if (!user) {
      return res.status(401).json({ msg: "Invalid token" });
    }

    req.user = user;
    next();

  } catch (error) {
    return res.status(401).json({ msg: "Token verification failed" });
  }
}

module.exports = {
  restrictToLoggedinUserOnly
};