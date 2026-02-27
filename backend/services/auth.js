
const jwt = require("jsonwebtoken")

const SECRET_KEY = "Pushpak@123"


function generateToken (user,role) {

    const payload = {
        email : user.email,
        password : user.password,
        role: role,
        
    }
    return jwt.sign(payload, SECRET_KEY)
}


function verifyToken(token){
    try{
        return jwt.verify(token , SECRET_KEY);
    }catch (err) {
        return null;
    }
}

module.exports = {
    verifyToken,
    generateToken,
}