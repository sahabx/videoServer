const express = require("express");
const { isJoi } = require("joi/lib/types/symbol");
const router = express.Router();
const {Subscriptions, SubscriptionValidator} = require("../models/subscription.js")
const {Customers} = require("../models/customer.js");
const {Courses} = require("../models/course.js");
const mongoose = require("mongoose");
const auth = require("../middleware/auth.js")



router.get("/",async (req,res)=>{
    try{
        let subscriptions = await Subscriptions.find();
        console.log("subscription query: all")
       res.send(subscriptions)
    }catch(e){
        console.log(e);
        res.send(e.message)
    }
});


router.post("/",auth,async(req,res)=>{
   try{
    let validation = SubscriptionValidator(req.body)
    if(!validation){res.status(400).send(validation.details)}

    
    if(mongoose.Types.ObjectId.isValid(req.body.customerId) && mongoose.Types.ObjectId.isValid(req.body.courseId)){
        console.log("invalid ID");
        res.send("Either customer ID or course  ID is invalid");
        return
    }
    
    customer = await Customers.findById({_id:req.body.customerId});

    if(!customer){
        res.status(400).send(validation.details);
        console.log(validation)
    };

    course = await Courses.findById({_id:req.body.courseId});


    if(!customer){
        res.status(400).send(validation.details);
        console.log(validation)
    };

    let newSubscription = new Subscriptions({
        customer:{
            _id:customer._id,
            name: customer.name,
            isGold:customer.isGold,
            phone:customer.phone
        },
        course:{
            _id: course._id,
            title: course.title,
            monthlySubscriptionRate: course.monthlySubscriptionRate
        }
    })

    newSubscription = await newSubscription.save();
    course.numberInStock--;
    course.save();

    res.send(newSubscription)


   }catch(e){
       console.log(e);
       res.send(e.message)
   }
})



module.exports = router;