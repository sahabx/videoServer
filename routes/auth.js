const express = require("express");
const router = express.Router();
const _ = require("lodash")
const {Users} = require("../models/user.js")
const bcrypt = require("bcrypt")
const Joi = require("Joi")
const jwt = require("jsonwebtoken")
const config = require("config")



router.post("/",async(req,res)=>{
    let validation = validate(req.body)
        if(validation.error){
            res.status(400).send("from Joi: "+JSON.stringify(validation.error.details));
            return
        }
    try{

        let user = await Users.findOne({email:req.body.email});
        
        if(!user){
            res.status(400).send("Invalid email or password");
            return
        }
        validPassword = await bcrypt.compare(req.body.password,user.password)

        if(!validPassword){
            res.status(400).send("Invalid email or password");
            return
        }

        const token = user.generateAuthToken();

        res.send(token)

    }catch(e){
        res.send(e.message);
    }
})


function validate(input){
    const userSchema = {
        email: Joi.string().email().required(),
        password: Joi.string().min(3).required()

    }
    return Joi.validate(input,userSchema)
}


module.exports = router;