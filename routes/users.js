const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const _ = require("lodash")
const {Users, userValidation} = require("../models/user.js")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const config = require("config")


router.post("/",async(req,res)=>{
    let validation = userValidation(req.body)
        if(validation.error){
            res.status(400).send("from Joi: "+JSON.stringify(validation.error.details));
            return
        }
    try{

        let user = await Users.findOne({email:req.body.email});
        
        if(user){
            res.status(400).send("A user is already registered with this email address");
            //console.log(_.pick(req.body,["name","email","password"]) )
            return
        }

        

        user = new Users(_.pick(req.body,["name","email","password"]))

        let salt = await bcrypt.genSalt(5);
        user.password = await bcrypt.hash(user.password,salt)

        let result = await user.save();

        console.log("user.generateAuthToken()")
        console.log(user.generateAuthToken())

        const token = user.generateAuthToken();

        
        res.header("x-auth-token", token).send(_.pick(result,["name","email"]))
        
        console.log("Posted a new user");
    }catch(e){
        res.send(e.message);
    }
})


module.exports = router;