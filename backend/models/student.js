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

    gender: {
        type: String,
    },
}, {timestamps: true})


const Student = mongoose.model("student", studentSchema);

module.exports = Student;