
function log(req,res,next){
    console.log("Loggin Procedure");
    next();
}

module.exports = log;