const express = require("express")
const dotenv = require("dotenv")        // ADD THIS
dotenv.config()                          // ADD THIS
const PORT = process.env.PORT || 8004   // CHANGE THIS
const app = express()
const fs = require("fs")
const {createLogs} = require("./middlewares/log")
const  mongoose = require("mongoose")
const studentRouter = require("./routes/studentRoutes")
const courseRouter = require("./routes/courseRoutes")
const assignmentRouter = require("./routes/assignmentRoutes")
const cors = require("cors");
const cookieParser = require("cookie-parser");


// Middleware--------------------------------------
   app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",  // CHANGE THIS
    credentials: true
}));
    app.use(createLogs("log.txt"));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cookieParser())

// CONNECTION ------------------------
    mongoose.connect(process.env.MONGO_URI)   // CHANGE THIS
        .then(() => {console.log("MongoDB connected")})
        .catch(err => console.log(err))
            
// ROUTES -----------------------------
   app.use('/', studentRouter)
   app.use('/', courseRouter)
   app.use('/', assignmentRouter)


// SERVER -------------------------------------------------------
    app.listen(PORT, ()=> {console.log("Server started @ : ", PORT)})
    console.log("welcome to student management system")