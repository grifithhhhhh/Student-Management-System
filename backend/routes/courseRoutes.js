
const express = require("express")
const router = express.Router();
const {handleNewCourse, enroleStudentInCourse, getAllCourses, deleteCourse, updateAttendance, updateMarks,enrollMultipleStudentsInSingleCourse, enroleStudentInMultipleCourse} = require("../controllers/courses")


// Routes -----------------------------------------------------

router.post('/courses', handleNewCourse )
router.post('/enrollcourse', enroleStudentInCourse)
router.get('/courses', getAllCourses)
router.delete('/courses/:CourseId', deleteCourse)
router.patch('/courses/attendance', updateAttendance)
router.patch('/courses/marks', updateMarks)
router.patch('/enrollmultiplecoures', enroleStudentInMultipleCourse)
router.patch('/enrollmulitpleStudents', enrollMultipleStudentsInSingleCourse)


module.exports = router