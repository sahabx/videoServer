
const express = require("express")
const router = express.Router();
const {Subscriptions} = require("../models/subscription.js")
const auth = require("../middleware/auth")

router.post("/",auth,async (req,res)=>{
    try{
        if(!req.body.customerId){
            return res.status(400).send("Customer ID not provided")
        }

        if(!req.body.courseId){
            return res.status(400).send("Course ID not provided")
        }

        let subscription = await Subscriptions.findOne({
            "customer._id":req.body.customerId,
            "course._id":req.body.courseId
        })

        console.log(subscription)

        if(!subscription){return res.status(404).send("No subscription found") }

        if(subscription.cancelled){return res.status(400).send("Subscriptoin is already cancelled") }

        return res.status(200).send("done")

        res.status(401).send("Unauthorized")
    }catch(e){
        console.log(e)
    }
})

module.exports = router