const express = require("express")
const PORT = 8004
const app = express()
const fs = require("fs")
app.use(express.json());
const {createLogs} = require("./middlewares/log")


// Middleware--------------------------------------
app.use(createLogs("log.txt"));


// ROUTES -----------------------------
app.get('/', (req,res)=> {
    res.send("the server is running")
})

app.post('/users', (req,res)=> {
    const body = req.body;
    console.log(body);

    res.json(
        {messageStatus : "recieved",
            data: body
        }
    )
})

// SERVER -------------------------------------------------------
app.listen(PORT, ()=> {console.log("Server started @ : ", PORT)})
console.log("welcome to student management system")