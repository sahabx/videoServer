const Joi = require("joi")
const mongoose = require("mongoose")


const departmentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength:3,
        maxlength:50
    },
    keyPerson:{
        type: String,
        required: true,
        minlength:3,
        maxlength:50
    }

})

const Department = mongoose.model("departments",departmentSchema)



function departmentValidator(inputObject){
    const schema = {
        name: Joi.string().min(3).required(),
        keyPerson: Joi.string().min(3).required()
    }
    return Joi.validate(inputObject, schema);
 }



 module.exports.Department = Department;
 module.exports.departmentValidator = departmentValidator;