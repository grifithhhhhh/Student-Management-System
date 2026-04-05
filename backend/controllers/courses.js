
const Course = require("../models/Courses");
const Student = require("../models/student")

async function enrollMultipleStudentsInSingleCourse(req, res) {

  const { StudentsIds, CourseId } = req.body;

  if (!StudentsIds || !CourseId) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {

    const course = await Course.findById(CourseId);

    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    const enrolledStudents = [];

    for (const StudentId of StudentsIds) {

      const student = await Student.findById(StudentId);

      if (!student) continue;

      const alreadyEnrolled = student.courses.some(
        c => c.course.toString() === CourseId
      );

      if (alreadyEnrolled) continue;

      course.students.push(StudentId);

      student.courses.push({
        course: CourseId,
        totalClasses: 0,
        attendedClasses: 0,
        marks: 0
      });

      await student.save();

      enrolledStudents.push(student);

    }

    await course.save();

    return res.status(200).json({
      msg: "Students enrolled successfully",
      students: enrolledStudents
    });

  } catch (error) {
    return res.status(500).json({ Error: error.message });
  }

}



async function deleteCourse(req,res) {
    const CourseId = req.params.CourseId

  try{
    const courseToBeDeleted = await Course.findById(CourseId);
    if(!courseToBeDeleted){
        return res.status(400).json({msg: "Course not found"})
    }

    const result = await Student.updateMany(
        {"courses.course": CourseId},
        {$pull : {courses: {course: CourseId}}}
    )
    
    const deletedCourse = await Course.findByIdAndDelete(CourseId)

    return res.status(200).json({msg: "worked succesfully ", deletedCourse : deletedCourse, students : result })

  }catch(error){
    return res.status(500).json({msg: "server side error", error : error.message})
  }
    
}

async function getAllCourses(req, res) {
        
    const allcourse = await Course.find({})
    if(allcourse === null){
        return res.status(400).json({msg: "no course found"})
    }

    return res.status(200).json({msg: "worked", Courses: allcourse })
}

async function handleNewCourse (req, res) {
    const {courseName} = req.body;

    if(!courseName){
        return res.status(400).json({msg: "Enter course name "})
    }
    try{
        const response = await Course.create({
        courseName: courseName
    })
      return res.status(200).json({msg: "course created", course: response})
    ;}
    catch(error){
        return res.status(400).json({error: error})
    }

}
async function enroleStudentInMultipleCourse(req,res) {
    const {AppliedCourses, StudentId} = req.body

    if(!StudentId || !AppliedCourses){                 
        return res.status(400).json({msg: "All fields are required"})
    }
    try{
           const student = await Student.findById(StudentId);
    if (!student) {
      return res.status(404).json({ msg: "Student not found" });
    }
      const skippedCourses = [];
      const enrolledCourses = [];

    for( const CourseId of AppliedCourses){

    const course = await Course.findById(CourseId);
    if (!course) {
        skippedCourses.push({ CourseId, reason: "Course not found" });
        continue;
      }

    const alreadyEnrolled = student.courses.some(
      c => c.course.toString() === CourseId.toString()
    );

    if (alreadyEnrolled) {
       skippedCourses.push({ CourseId, reason: "Already enrolled" });
        continue;
    }
    
    course.students.push(StudentId)

    student.courses.push({
      course: CourseId,
      totalClasses: 0,
      attendedClasses: 0,
      marks: 0
    });

     await course.save();

    }

    await student.save();
   
    return res.status(200).json({
      msg: "Student enrolled successfully",
      Student: student
    });
    }catch(error){
        return res.status(500).json({Error: error.message})
    }
}

async function enroleStudentInCourse (req, res) {
    const {CourseId, StudentId} = req.body

    if(!StudentId || !CourseId){
        return res.status(400).json({msg: "All fields are required"})
    }
    try{
           const student = await Student.findById(StudentId);
    if (!student) {
      return res.status(404).json({ msg: "Student not found" });
    }

    const course = await Course.findById(CourseId);
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    const alreadyEnrolled = student.courses.some(
      c => c.course.toString() === CourseId
    );

    if (alreadyEnrolled) {
      return res.status(400).json({ msg: "Student already enrolled" });
    }
    
    course.students.push(StudentId)

    student.courses.push({
      course: CourseId,
      totalClasses: 0,
      attendedClasses: 0,
      marks: 0
    });

    await student.save();
    await course.save();

    return res.status(200).json({
      msg: "Student enrolled successfully",
      Student: student
    });
    }catch(error){
        return res.status(500).json({Error: error.message})
    }
}

async function updateAttendance(req, res) {
    const {CourseId, StudentId, ifPresent } = req.body;
    if(!CourseId || !StudentId || ifPresent == undefined){
        return res.status(400).json({msg: "all fields are required"})
    }
    

    try{
        const updateQuery = {
            $inc: {
                "courses.$.totalClasses": 1
                }};

        if (ifPresent) {
        updateQuery.$inc["courses.$.attendedClasses"] = 1;
        }

        const student = await Student.findOneAndUpdate(
            { _id: StudentId, 
            "courses.course": CourseId,
        },updateQuery,
      { new: true });

      return res.status(200).json({msg: "updated succesfully", student: student})

    }catch(error){
        return res.status(500).json({msg: "servers side problem", error: error.message})
    }
}


async function updateMarks(req,res) {
    const { StudentId, CourseId , Marks} = req.body

    if(!StudentId || !CourseId || !Marks ){
        return res.status(400).json({msg : "All fields are required"})
    }

    try{
        
        const student = await Student.findOneAndUpdate(        
            { _id: StudentId, 
            "courses.course": CourseId,
        },{
            $set: {
            "courses.$.marks": Marks
            }})

        if(!student){
            return res.status(400).json({msg: "Student not found"})
        }    

        return res.status(200).json({msg: "marks updated succesfully", Student: student})
    }
    catch(error){
        return res.status(500).json({msg: "Server side error ", Error: error.message })
    }
}


module.exports = {
    handleNewCourse,
    enroleStudentInCourse,
    getAllCourses,
    deleteCourse,
    updateAttendance,
    updateMarks,
    enroleStudentInMultipleCourse,
    enrollMultipleStudentsInSingleCourse,
}
    
