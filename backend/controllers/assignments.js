const Course = require("../models/Courses")
const Assignment = require("../models/Assignment")

// CREATE ASSIGNMENT
async function handleNewAssignment(req, res) {

    const { CourseId, title, description, dueDate } = req.body

    if (!CourseId || !title || !description || !dueDate) {
        return res.status(400).json({ msg: "All fields are required" })
    }

    try {

        const assignment = await Assignment.create({
            title,
            description,
            dueDate,
            course: CourseId
        })

        await Course.findByIdAndUpdate(
            CourseId,
            { $push: { assignments: assignment._id } },
            { new: true }
        )

        return res.status(201).json({
            msg: "Assignment added successfully",
            assignment
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Server error",
            error: error.message
        })
    }
}


// GET ALL ASSIGNMENTS
async function getAllAssignments(req, res) {

    try {

        const assignments = await Assignment.find()
            .populate("course")

        return res.status(200).json({
            assignments
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Server error",
            error: error.message
        })
    }
}


// GET ASSIGNMENTS BY COURSE
async function getAssignmentsByCourse(req, res) {

    const { courseId } = req.params

    try {

        const assignments = await Assignment.find({
            course: courseId
        })

        return res.status(200).json({
            assignments
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Server error",
            error: error.message
        })
    }
}


// UPDATE ASSIGNMENT
async function updateAssignment(req, res) {

    const { id } = req.params
    const { title, description, dueDate } = req.body

    try {

        const assignment = await Assignment.findByIdAndUpdate(
            id,
            { title, description, dueDate },
            { new: true }
        )

        if (!assignment) {
            return res.status(404).json({ msg: "Assignment not found" })
        }

        return res.status(200).json({
            msg: "Assignment updated",
            assignment
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Server error",
            error: error.message
        })
    }
}


// DELETE ASSIGNMENT
async function deleteAssignment(req, res) {

    const { id } = req.body

    try {

        const assignment = await Assignment.findByIdAndDelete(id)

        if (!assignment) {
            return res.status(404).json({ msg: "Assignment not found" })
        }

        await Course.findByIdAndUpdate(
            assignment.course,
            { $pull: { assignments: id } }
        )

        return res.status(200).json({
            msg: "Assignment deleted"
        })

    } catch (error) {
        return res.status(500).json({
            msg: "Server error",
            error: error.message
        })
    }
}

module.exports = {
    handleNewAssignment,
    getAllAssignments,
    getAssignmentsByCourse,
    updateAssignment,
    deleteAssignment
}