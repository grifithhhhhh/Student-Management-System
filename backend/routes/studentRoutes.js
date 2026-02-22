const express = require("express")
const { handleNewStudent, removeStudent, handleGetAllStudents } = require("../controllers/student")
const router = express.Router()


// ACTUAL ROUTES------------------------------------------
    router.post('/students', handleNewStudent)
    router.delete('/students/:id', removeStudent)
    router.get('/students', handleGetAllStudents)

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