
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
    
    courses:[
        
    {
        course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",  
        },
        
        totalClasses: {
        type: Number,
        default: 0
        },
        
        attendedClasses: {
        type: Number,
        default: 0
        },
        
        marks: {
        type: Number,
        default: 0
    }
    }
],
}, {timestamps: true})


const Student = mongoose.model("student", studentSchema);

module.exports = Student;