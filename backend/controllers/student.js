
const Student = require("../models/student");
const Admin = require("../models/admin")
const {generateToken,verifyToken} = require("../services/auth")

// NEW STUDENTS--------------------------------------------------------------
async function handleNewStudent (req,res) {
    const body = req.body

    if (
        !body ||
        !body.firstName ||
        !body.lastName ||
        !body.gender ||
        !body.email ||
        !body.password
    ){
        return res.status(400).json({msg: "All fields are required"})
    }

    const student = await Student.create({
        firstName: body.firstName,
        lastName: body.lastName,
        gender: body.gender,
        email: body.email,
        password: body.password,
        imgURL: body.imgURL,
        courses: body.courses,
        attendance: body.attendance,

    })
        return res.status(201).json(student)
}

async function handleNewAdmin (req,res) {
    const body = req.body

    if (
        !body ||
        !body.firstName ||
        !body.lastName ||
        !body.gender ||
        !body.email ||
        !body.password
    ){
        return res.status(400).json({msg: "All fields are required"})
    }

    const admin = await Admin.create({
        firstName: body.firstName,
        lastName: body.lastName,
        gender: body.gender,
        email: body.email,
        password: body.password,
        imgURL: body.imgURL,
        courses: body.courses,
        attendance: body.attendance,

    })
        return res.status(201).json(admin)
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

async function getStudentByEmail(req, res) {
  try {
      // get email from URL
    const student = await Student.findOne({ email: req.params.email});

    if (!student) {
      return res.status(404).json({ msg: "Student not found" });
    }

    return res.status(200).json(student);

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function handleLogin(req,res) {
    const {email, password, role}= req.body
  if(role === "student"){

        const student = await Student.findOne({ email });
        if (!student) {
        return res.status(404).json({ msg: "Student not found" });
      }

      if (student.password !== password) {
        return res.status(401).json({ msg: "Wrong password" });
      }

        //create jwt 
      const token = generateToken(student);

    // send this token to browser
        res.cookie("token", token);
        console.log(token)
        console.log("student : ", student);
        console.log("email : ",student.email);
      
        return res.status(200).json({msg: "worked correctly", token:token, student: student})
  }
  
  if(role === "admin") {
    const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(404).json({ msg: "Student not found" });
  }

  if (admin.password !== password) {
    return res.status(401).json({ msg: "Wrong password" });
  }

    //create jwt 
   const token = generateToken(admin);

 // send this token to browser
    res.cookie("token", token);
    console.log(token)
    console.log("admin : ", admin);
    console.log("email : ",admin.email);
  
    return res.status(200).json({msg: "worked correctly"})
  }
  
  }



module.exports = {
    handleNewStudent, 
    removeStudent,
    handleGetAllStudents,
    getStudentByEmail,
    handleLogin,
    handleNewAdmin,
}