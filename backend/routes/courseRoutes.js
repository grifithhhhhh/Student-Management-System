
const express = require("express")
const router = express.Router();
const {handleNewCourse, enroleStudentInCourse, getAllCourses, deleteCourse, updateAttendance, updateMarks} = require("../controllers/courses")


// Routes -----------------------------------------------------

router.post('/courses', handleNewCourse )
router.post('/enrollcourse', enroleStudentInCourse)
router.get('/courses', getAllCourses)
router.delete('/courses/:CourseId', deleteCourse)
router.patch('/courses/attendance', updateAttendance)
router.patch('/courses/marks', updateMarks)


module.exports = router