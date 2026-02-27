const { verifyToken } = require("../services/auth");

function restrictToLoggedinUserOnly(req, res, next) {
  console.log("authentication middleware triggered");

  const token = req.cookies?.token;
  console.log("token:", token);

  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  try {
    const user = verifyToken(token);
    console.log("decoded user:", user);

    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = user;   // attach user to request
    next();

  } catch (error) {
    console.log("JWT error:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = {
  restrictToLoggedinUserOnly
};