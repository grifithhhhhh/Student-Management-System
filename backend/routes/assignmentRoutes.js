const express = require("express")
const router = express.Router();
const {handleNewAssignment} = require("../controllers/assignments")



router.post('/assignment', handleNewAssignment);


module.exports = router;