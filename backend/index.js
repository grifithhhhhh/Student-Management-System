const express = require("express")
const PORT = 8004
const app = express()
const fs = require("fs")

// ROUTES -----------------------------
app.get('/', (req,res)=> {
    res.send("the server is running")
})

const log = `${Date.now()} hey there \n`

fs.appendFile("./log.txt", log , (err) => {
    console.log(err)
})

// SERVER -------------------------------------------------------
app.listen(PORT, ()=> {console.log("Server started @ : ", PORT)})
console.log("welcome to student management system")