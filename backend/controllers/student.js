const Student = require("../models/student");

// NEW STUDENTS--------------------------------------------------------------
async function handleNewStudent (req,res) {
    const body = req.body

    if (
        !body ||
        !body.firstName ||
        !body.lastName ||
        !body.gender ||
        !body.email
    ){
        return res.status(400).json({msg: "All fields are required"})
    }

    const student = await Student.create({
        firstName: body.firstName,
        lastName: body.lastName,
        gender: body.gender,
        email: body.email,
        imgURL: body.imgURL,
        courses: body.courses,
        attendance: body.attendance,

    })
        return res.status(201).json(student)
}

// DELETE STUDENT ----------------------------------------------------------------
async function removeStudent (req,res) {
    try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ msg: "Student not found" });
    }

    return res.json({ status: "deleted", Student });
  } catch (err) {
    return res.status(400).json({ error: "Invalid ID" });
  }
}

// ALL STUDENTS ----------------------------------------------------------------------
async function handleGetAllStudents(req, res) {
    const student = await Student.find({});
    return res.json(student);
    }

module.exports = {
    handleNewStudent, 
    removeStudent,
    handleGetAllStudents,
}