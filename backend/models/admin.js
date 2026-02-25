const mongoose = require("mongoose")

const adminSchmea = new mongoose.Schema({

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
}, {timestamps: true})


const Admin = mongoose.model("admin", adminSchmea)

module.exports = Admin;