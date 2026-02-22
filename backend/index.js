const express = require("express")
const PORT = 8004
const app = express()
const fs = require("fs")
const {createLogs} = require("./middlewares/log")
const  mongoose = require("mongoose")

// Middleware--------------------------------------
    app.use(createLogs("log.txt"));
    app.use(express.json());

// CONNECTION ------------------------
    mongoose.connect('mongodb://127.0.0.1:27017/studentserver')
    .then(() => {console.log("MongoDB connected")})
    .catch(err => console.log(err))
    
// ROUTES -----------------------------
    app.get('/', (req,res)=> {
        res.send("the server is running")
    })

    app.post('/', (req,res)=> {
        const Body = req.body;
        console.log(Body);
        res.json(Body)
    })

// SERVER -------------------------------------------------------
    app.listen(PORT, ()=> {console.log("Server started @ : ", PORT)})
    console.log("welcome to student management system")

