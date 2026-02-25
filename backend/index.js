const express = require("express")
const PORT = 8004
const app = express()
const fs = require("fs")
const {createLogs} = require("./middlewares/log")
const  mongoose = require("mongoose")
const studentRouter = require("./routes/studentRoutes")
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { restrictToLoggedinUserOnly } = require("./middlewares/auth")

// Middleware--------------------------------------
    app.use(cors({
    origin: "http://localhost:5173", // your frontend port
    credentials: true
    }));
    app.use(createLogs("log.txt"));
    app.use(express.json());
    app.use(cookieParser())

// CONNECTION ------------------------
    mongoose.connect('mongodb://127.0.0.1:27017/studentserver')
    .then(() => {console.log("MongoDB connected")})
    .catch(err => console.log(err))
    
// ROUTES -----------------------------
   app.use('/', studentRouter)

// SERVER -------------------------------------------------------
    app.listen(PORT, ()=> {console.log("Server started @ : ", PORT)})
    console.log("welcome to student management system")

