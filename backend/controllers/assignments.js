const Course = require("../models/Courses")
const Assignment = require("../models/Assignment")

async function handleNewAssignment(req, res) {
    console.log("assignment is working")
    const {CourseId, title, description, dueDate} = req.body

    if(!CourseId || !title || !description  || !dueDate ){
        return res.status(400).json({msg: "All fields are required"})
    }

    try {
        const assignment = await Assignment.create({
            title: title,
            description: description,
            dueDate : dueDate,
            course: CourseId,
        })

        const currentCourse = await Course.findOneAndUpdate({
            _id: CourseId
        },{$push : {assignments: assignment._id}},{new : true})

        return res.status(200).json({msg: "Assignment added succesfully", assignment: assignment, currentCOurse: currentCourse })

    } catch (error) {
        return res.status(500).json({msg: "Server side error" , Error : error.message})
    }
    
}


module.exports = {handleNewAssignment}