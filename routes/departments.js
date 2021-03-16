const express = require("express");
const router = express.Router();
const Joi = require("joi")
const mongoose = require("mongoose")
const {Department,departmentValidator} = require("../models/department.js")



// const newDepartment = new Department({
//     name:"Cloud Computing",
//     author:"Amazon",
//     tags:["Cloud","Remote","New", "Tech"],
//     isPublished: true
// })

// async function topicScan(){
//     try{
//         const result = newDepartment.save();
//         console.log(result)
//         return result
//     }catch(e){
//         console.log(e)
//     }
// }

//topicScan();


router.get("/",async(req,res)=>{
    department = await Department.find();
    console.log(department)
    res.send(department);
    console.log("department enquired")
})

router.get("/:id",async(req,res)=>{
    try{
        let result = await Department.find({_id:req.params.id})
        res.send(result);
    }catch(e){console.log(e.message); res.send(e.message)}
    console.log("Single result query")
})

/*******************************************
 * Setting up POST routes
 * *****************************************/

router.post("/",async(req,res)=>{

    let input = departmentValidator(req.body);

    if(input.error){
        res.send(input.error.details)
        return
    }

    let newSubject = new Department({
        name: req.body.name,
        keyPerson: req.body.keyPerson
    })

    newSubject = await newSubject.save();
    res.send(newSubject);
})

/*******************************************
 * Setting up PUT routes
 * *****************************************/
router.put("/:id",async(req,res)=>{
    try{
        let result = Department.find({_id:req.params.id})
        let input = departmentValidator(req.body);
        if(input.error){
            res.send(input.error.details)
            return
        }

        result = await Department.findByIdAndUpdate({_id:req.params.id},{
            name:req.body.name,
            keyPerson:req.body.keyPerson
        },{new: true})

    
        res.send(result)
    }catch(err){console.log(err.message); res.send(err.message)}
    
    
})


/*******************************************
 * Setting up Delete routes
 ******************************************/

router.delete("/:id",async(req,res)=>{
    try{
        let result = Department.find({_id:req.params.id})
        result = await Department.deleteOne({_id:req.params.id})
        res.send(result)
    }catch(e){console.log(e); res.send(e.message)}
})


/*******************************************
 * Input validation
 * *****************************************/





module.exports=router;