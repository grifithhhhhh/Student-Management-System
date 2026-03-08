
const express = require("express")
const { handleNewStudent, removeStudent, handleGetAllStudents, getStudentByEmail, handleLogin, handleNewAdmin, patchStudent, testpatchStudent,  } = require("../controllers/student")
const router = express.Router()
const Student = require("../models/student");
const {restrictToLoggedinUserOnly} = require("../middlewares/auth")

// ACTUAL ROUTES------------------------------------------
    router.post('/students', handleNewStudent)
    router.delete('/students/:id', removeStudent)
    router.get('/students', handleGetAllStudents)
    router.get('/students/email/:email', getStudentByEmail)
    router.post('/logininfo',handleLogin)
    router.post('/admins', handleNewAdmin)
    router.patch('/students/:email', testpatchStudent)

    router.get("/check-auth", restrictToLoggedinUserOnly, (req, res) => {
            res.status(200).json({
                valid: true,
                user: req.user
            });
            });

    router.post("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        expires: new Date(0),
        sameSite: "lax",
        secure: false, // true only in production (https)
    });

    res.status(200).json({ message: "Logged out successfully" });
    });
  

// TEST ROUTES -------------------------------------------
    router.get('/', (req,res)=> {
            res.send("the server is running")
        })

module.exports = router;