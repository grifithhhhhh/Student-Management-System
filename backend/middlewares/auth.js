const {verifyToken} = require("../services/auth")


async function restrictToLoggedinUserOnly(req, res, next) {
    const token = req.cookies?.token;
    console.log("token: ", token)
    if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }
    const user = verifyToken(token);
   if (!user) {
    return res.status(401).json({ message: "User not found" });
  }
  
    req.user = user;
    console.log ("user: ",user);
    next();
}

module.exports = {
    restrictToLoggedinUserOnly
}