const mongoose = require("mongoose")
const winston = require("winston")



/******************************************
 *  Connecting with mongoDB
 *******************************************/

 module.exports = function(){
     mongoose.connect('mongodb://localhost/learnerAid')
        .then(()=>{winston.info("Connected to MongoDB")})
 }