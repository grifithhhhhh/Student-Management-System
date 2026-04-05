const express = require("express")
const router = express.Router();
const {
    handleNewAssignment,
    getAllAssignments,
    getAssignmentsByCourse,
    updateAssignment,
    deleteAssignment
} = require("../controllers/assignments")


router.post('/assignments', handleNewAssignment);
router.get("/assignments", getAllAssignments)
router.get("/assignments/course/:courseId", getAssignmentsByCourse)
router.patch("/assignments/:id", updateAssignment)
router.delete("/assignments", deleteAssignment)


module.exports = router;