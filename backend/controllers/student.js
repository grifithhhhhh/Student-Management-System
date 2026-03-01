
const Student = require("../models/student");
const Admin = require("../models/admin")
const {generateToken,verifyToken} = require("../services/auth")
const bcrypt = require("bcrypt");
// NEW STUDENTS--------------------------------------------------------------

async function testpatchStudent(req,res){
  const body = req.body
  const email = req.params.email

   if(body.password){
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(body.password, saltRounds) 
    body.password = hashedPassword
  }

  const oldStudent = await Student.findOneAndUpdate({email: email},body,{new: true})
  if (!oldStudent) {
  return res.status(404).json({ msg: "Student not found" });
}
  const {password : pwd, ...safeStudent } = oldStudent.toObject()
  console.log("safeStudent: ",safeStudent)
  return res.status(200).json(safeStudent)
}


async function patchStudent(req,res) {
    const email = req.params.email
    const updatedbody = {...req.body}

    if(updatedbody.password){
    const saltRounds = 10;
    updatedbody.password = await bcrypt.hash(updatedbody.password,saltRounds);

    try{
      const newStudent = await Student.findOneAndUpdate(
      {email: email},
      {body},
      {new : true}
    )
    
    const {password: pwd, ...safeStudent } = newStudent.toObject()
    return res.status(201).json(safeStudent)
    }catch(error){
      return res.status(500).json({ msg: error.message });
    }
    }


try{
      const newStudent = await Student.findOneAndUpdate(
      {email},
      {body},
      {new : true}
    )
    
    
    return res.status(201).json(newStudent)
}catch(error){
    return res.status(500).json({ msg: error.message });
}
   
}

async function handleNewStudent (req,res) {
    const body = req.body

    
    try{
      if (
        !body ||
        !body.firstName ||
        !body.lastName ||
        !body.gender ||
        !body.email ||
        !body.password
    ){
        console.log("all fields are required")
        return res.status(400).json({msg: "All fields are required"})
    }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(body.password,saltRounds);

        const newStudent = await Student.create({
        firstName: body.firstName,
        lastName: body.lastName,
        gender: body.gender,
        email: body.email,
        password: hashedPassword,
        imgURL: body.imgURL,
        courses: body.courses,
        attendance: body.attendance,

    });
      const {password: pwd, ...safeStudent } = newStudent.toObject()
      return res.status(201).json(safeStudent)
    
    }catch(err) {
      return res.status(500).json({ msg: err.message });
    }
    
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
    try{
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(body.password, saltRounds)
      const newAdmin = await Admin.create({
        firstName: body.firstName,
        lastName: body.lastName,
        gender: body.gender,
        email: body.email,
        password: hashedPassword,
        imgURL: body.imgURL,

    });
    const {password : pwd, ...safeAdmin} = newAdmin.toObject()
    return res.status(201).json(safeAdmin)

    }catch(err){
      return res.status(500).json({ msg: "either the email is taken or fill all inputs" });
    }
    
        
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
      const isMatch = await bcrypt.compare(password, student.password);
      console.log("is match: ", isMatch)
      console.log("password: ", password)
      console.log("admin: ", student.password)    
      if (!isMatch) {
        return res.status(401).json({ msg: "Wrong password" });
      }
        //create jwt 
      const token = generateToken(student,role);
      console.log(token)
    // send this token to browser
      res.cookie("token", token,{
        httpOnly: true,
        secure: false,   
        sameSite: "lax",
      });
      const {password  : pwd, ...safeStudent } = student.toObject()
      console.log("safeStudent: ",safeStudent)
      return res.status(200).json({student: safeStudent})
      
  }
  
  if(role === "admin") {
    const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(404).json({ msg: "Student not found" });
  }
  const isMatch = await bcrypt.compare(password, admin.password);
  console.log("password: ", password)
  console.log("admin: ", admin.password)
      if (!isMatch) {
        return res.status(401).json({ msg: "Wrong password" });
      }
  

    //create jwt 
   const token = generateToken(admin,role);

 // send this token to browser
    res.cookie("token", token,{
        httpOnly: true,
        secure: false,   
        sameSite: "lax",
      });
    const allStudent = await Student.find({});
    const safeStudents = allStudent.map(student => {
    const { password : pwd, ...s } = student.toObject();
    return s;
  }); 
  const {password : pwd, ...safeAdmin } = admin.toObject()
    return res.status(200).json({Data: {admin:safeAdmin,StudentData: safeStudents}})
  }
  
  }



module.exports = {
    handleNewStudent, 
    removeStudent,
    handleGetAllStudents,
    getStudentByEmail,
    handleLogin,
    handleNewAdmin,
    patchStudent,
    testpatchStudent,
}