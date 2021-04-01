const winston = require("winston")


module.exports =  function(err,req,res,next){
    winston.error({message:err.message,meta:err.stack})
    res.status(500).send(err.message)
}