
const admin = function(req,res,next){
    if(req.user.isAdmin){
        next()
    }else{
        res.status(403).send("forbidden bro")
    }
}

module.exports = admin