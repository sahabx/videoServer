const { response } = require("express");
const express = require("express");
const router = express.Router();
const Joi = require("Joi");
const {Courses, courseValidators} = require("../models/course.js")
const {Department} = require("../models/department.js")
const auth = require("../middleware/auth.js")
const admin = require("../middleware/admin.js")



router.get("/",async (req,res)=>{
    try{
        let courses = await Courses.find();
        console.log("Course query: all")
       res.send(courses)
    }catch(e){
        console.log(e);
        res.send(e.message)
    }
});

router.get("/:id",async (req,res)=>{
    try{
        course = await Courses.find({_id:req.params.id})
        console.log("Course query: all")
        res.send(course)
    }catch(e){
        console.log(e);
        res.send(e.message)
    }
})

router.post("/",auth,async(req,res)=>{
    try{
        let validation = courseValidators(req.body);
        
        if(validation.error){
            res.send(validation.error.details);
            return
        } 

        let department = await Department.findById({_id:req.body.departmentId});

        if(!department){
            console.log("dpeartment is false");
            res.send("No department was found with the ID: "+req.body.departmentId)
            return
        } 

        let course = new Courses({
            title:req.body.title,
            department:{
                _id:department._id,
                name: department.name,
                keyPerson:department.keyPerson
            },
            numberInStock:req.body.numberInStock,
            monthlySubscriptionRate:req.body.monthlySubscriptionRate
        })
        const newCourse = await course.save();
        res.send(newCourse)
        console.log("Posted a new course");
    }catch(e){
        console.log(e);
        res.send(e.message)
    }
})

router.put("/:id",auth,async(req,res)=>{
    try{
        let validation = courseValidators(req.body);
        if(validation.error){
            res.send(validation.error.details);
            return
        }

        let department = await Department.findById({_id:req.body.departmentId});

        if(!department){
            console.log("dpeartment is false");
            res.send("No department was found with the ID: "+req.body.departmentId)
            return
        } 


        let result =await Courses.findByIdAndUpdate({_id:req.params.id},{
            title:req.body.title,
            department:{
                _id:department._id,
                name: department.name,
                keyPerson:department.keyPerson
            },
            numberInStock:req.body.numberInStock,
            monthlySubscriptionRate:req.body.monthlySubscriptionRate
        },{new: true})
        res.send(result)
        console.log("modified a new course");
    }catch(e){
        console.log(e);
        res.send(e.message)
    }
})

router.delete("/:id", [auth,admin],async(req,res)=>{
    try{
        let result = await Courses.findByIdAndRemove({_id:req.params.id})
        console.log("deleted a new course");
        res.send(result)
    }catch(e){
        console.log(e);
        res.send(e.message)
    }


})

module.exports = router;