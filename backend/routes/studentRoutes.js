const express = require("express")
const { handleNewStudent, removeStudent, handleGetAllStudents } = require("../controllers/student")
const router = express.Router()


// ACTUAL ROUTES------------------------------------------
    router.post('/users', handleNewStudent)
    router.delete('/users/:id', removeStudent)
    router.get('/users', handleGetAllStudents)

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