const config = require("config");


/******************************************
 *  Checking environmental variable 
 *  The app crashes if the environmental
 *  is not declared
 *******************************************/
module.exports = function(){
    if(!config.get("jwtPrivateKey")){
        throw new Error("FATAL ERROR: jwtPrivateKey was not declared");
    }
}