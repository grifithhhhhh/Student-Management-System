
const Student = require("../models/student");
const Admin = require("../models/admin")
const {generateToken,verifyToken} = require("../services/auth")

// NEW STUDENTS--------------------------------------------------------------

async function handleReloads(req, res) {
    console.log("handleReload is working");

    const token = req.cookies?.token;

    if (!token) {
        console.log("No token found in cookies");
        return res.status(401).json({ message: "Not authenticated" });
    }

    const user = verifyToken(token);

    if (!user) {
        console.log("Token invalid or expired");
        return res.status(401).json({ message: "User not found" });
    }

    const { email, role } = user;
    console.log("user from handleReload: ", user);

    if (role === "student") {
        const student = await Student.findOne({ email });
        return res.status(200).json({ student });
    }

    if (role === "admin") {
        const admin = await Admin.findOne({ email });
        const allStudent = await Student.find({});
        return res.status(200).json({ Data: { admin, StudentData: allStudent } });
    }
}

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
  console.log("handlelogin is working ------------------------------------------")
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
      const token = generateToken(student,role);

    // send this token to browser
        res.cookie("token", token);
        console.log(token)
        console.log("student : ", student);
        console.log("email : ",student.email);
      
      return res.status(200).json({msg: "worked correctly", token:token, student:student})
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
   const token = generateToken(admin,role);

 // send this token to browser
    res.cookie("token", token);
    //console.log(token);
    //console.log("admin : ", admin);
    //console.log("email : ",admin.email);
    const allStudent = await Student.find({});
  
    return res.status(200).json({msg: "worked correctly", token:token, Data: {admin:admin,StudentData: allStudent}})
  }
  
  }



module.exports = {
    handleNewStudent, 
    removeStudent,
    handleGetAllStudents,
    getStudentByEmail,
    handleLogin,
    handleNewAdmin,
    handleReloads,
}