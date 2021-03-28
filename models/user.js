const Joi = require("joi");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config")


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 3,
        maxlength:255
    },
    email:{
        type: String,
        required: true,
        minlength: 8,
        maxlength:255,
        unique:true
    },
    password:{
        type: String,
        required: true,
        minlength: 8,
        maxlength:1024
    }
})

userSchema.methods.generateAuthToken = function(){
    return jwt.sign({_id:this._id},config.get("jwtPrivateKey"));
    
}

const Users = mongoose.model("users",userSchema);


function userValidation(input){
    const userSchema = {
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(3).required()

    }
    return Joi.validate(input,userSchema)
}


module.exports.Users = Users;
module.exports.userValidation = userValidation;