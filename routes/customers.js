const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
const {Customers, customerValidation} = require("../models/customer.js")


router.get("/",async(req,res)=>{
    try{
        let customers = await Customers.find();
        res.send(customers);
        console.log("All Customers Enquired");
    }catch(e){
        res.send(e.message);
    }
})


router.get("/:id",async(req,res)=>{
    try{
        let customers = await Customers.find({_id: req.params.id});
        res.send(customers);
        console.log("Single Customers Enquired");
    }catch(e){
        res.send(e.message);
    }
})


router.post("/",async(req,res)=>{
    let validation = customerValidation(req.body)
        if(validation.error){
            res.send(validation.error.details);
            return
        }
    try{
        let newCustomer = new Customers({
            name: req.body.name,
            isGold: req.body.isGold,
            phone:req.body.phone
        })
        let result = await newCustomer.save();
        res.send(result)
        console.log("Posted a new customer");
    }catch(e){
        res.send(e.message);
    }
})


router.put("/:id",async(req,res)=>{

    let validation = customerValidation(req.body)
        if(validation.error){
            res.send(validation.error.details);
            return
        }
    try{
        let result = await Customers.findByIdAndUpdate({_id:req.params.id},{
            name: req.body.name,
            isGold: req.body.isGold,
            phone:req.body.phone
        },{new:true})
        
        res.send(result)
        console.log("Edited a customer information");
    }catch(e){
        res.send(e.message);
    }
})


router.delete("/:id",async(req,res)=>{
    try{
        let result = await Customers.find({_id:req.params.id})
        result = await Customers.deleteOne({_id:req.params.id})
        res.send(result)
    }catch(e){console.log(e); res.send(e.message)}
})

module.exports = router;