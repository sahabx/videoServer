const Joi = require("joi")
const mongoose = require("mongoose")


const customerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 3,
        maxlength:50
    },
    isGold:{
        type: Boolean,
        default: false
    },
    phone:{
        type: String,
        required: true,
        minlength: 3,
        maxlength:50
    }
})

const Customers = mongoose.model("Customer",customerSchema);




function customerValidation(input){
    const customerSchema = {
        name: Joi.string().min(3).required(),
        isGold: Joi.boolean(),
        phone: Joi.string().min(3).required()

    }
    return Joi.validate(input,customerSchema)
}


module.exports.Customers = Customers;
module.exports.customerValidation = customerValidation;