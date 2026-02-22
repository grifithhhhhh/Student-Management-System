const fs = require("fs")

function createLogs(filename){

    return(req,res,next)=>{
    const log = `${Date.now()}  hey there \n`;
    fs.appendFile(filename, log , (err) => {console.log(err)})

    next();}
    
}

module.exports = {
    createLogs,
}