const jwt = require("jsonwebtoken")


function auth(req,res,next){
    const token = req.header('x-auth-token');
    if(!token){res.status(401).send("Access Denied: No Token Provided")}


}