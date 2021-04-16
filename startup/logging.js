const winston = require("winston")
require("winston-mongodb");

module.exports = function(){
    winston.add(winston.transports.File,{filename:"./logger.log"});
    winston.add(winston.transports.MongoDB,{db:"mongodb://localhost/learnerAid"})

    // process.on("uncaughtException",(ex)=>{
    //     console.log("ERROR outside routes");
    //     winston.error({message:ex.message,meta:ex.stack})
    // })

    winston.handleExceptions(
        new winston.transports.File({filename:"uncaughtExceptions.log"}),
        new winston.transports.Console({colorize:true,prettyPrint:true}),
        new winston.transports.MongoDB({db:"mongodb://localhost/learnerAid"})
    )

    process.on("unhandledRejection",(ex)=>{
        console.log("**********ERROR Promise Rejected**********");
        throw ex
    })

}