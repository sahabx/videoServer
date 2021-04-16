
const express = require("express")
const router = express.Router();

router.post("/",(req,res)=>{
    if(!req.body.customerId){
        return res.status(400).send("Customer ID not provided")
    }

    if(!req.body.courseId){
        return res.status(400).send("Course ID not provided")
    }

    res.status(401).send("Unauthorized")
})

module.exports = router