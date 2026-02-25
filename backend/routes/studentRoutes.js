const express = require("express")
const { handleNewStudent, removeStudent, handleGetAllStudents, getStudentByEmail, handleLogin, handleNewAdmin } = require("../controllers/student")
const router = express.Router()
const Student = require("../models/student");

// ACTUAL ROUTES------------------------------------------
    router.post('/students', handleNewStudent)
    router.delete('/students/:id', removeStudent)
    router.get('/students', handleGetAllStudents)
    router.get('/students/email/:email', getStudentByEmail)
    router.post('/logininfo',handleLogin)
    router.post('/admins', handleNewAdmin)

  

// TEST ROUTES -------------------------------------------
    router.get('/', (req,res)=> {
            res.send("the server is running")
        })

    router.post('/', (req,res)=> {
            const Body = req.body;
            console.log(Body);
            res.json(Body)
        })

module.exports = router;