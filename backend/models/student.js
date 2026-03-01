const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: true,
    },

    lastName: {
        type: String
    },

    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

    gender: {
        type: String,
    },

    imgURL: {
        type: String,
    },
    
    courses: [{
        courseName: String,
        credits : Number,
        totalClasses: Number,
        attendedClasses: Number,
        percentage: Number,
    }],
    attendance: {
        totalClasses: Number,
        attendedClasses: Number,
        percentage: Number,
    },
}, {timestamps: true})


const Student = mongoose.model("student", studentSchema);

module.exports = Student;