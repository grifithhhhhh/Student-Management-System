const mongoose = require("mongoose")

const AssignmentSchema = new mongoose.Schema({

    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    dueDate: Date
},{timestamps: true})


const Assignment = mongoose.model("assignment", AssignmentSchema);

module.exports = Assignment