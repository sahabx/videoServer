const mongoose = require("mongoose");
const Joi = require("Joi");


const subscriptionSchema = new mongoose.Schema({
    customer:{
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength:3,
                maxlength:255
            },
            isGold:{
                type: Boolean,
                default: false
            },
            phone:{
                type:String,
                required: true,
                minlength:3,
                maxlength:255,
            }
        }),
        required: true
    },
    course:{
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                minlength:3,
                maxlength:255
            },
            monthlySubscriptionRate:{
                type:Number,
                min:0,
                max:9999,
                required:true
            }
        }),
        required:true
    },
    subscriptionDate:{
        type: Date,
        default: Date.now()
    },
    subscriptionPlan: String,
    subscriptionFee:{
        type: Number,
        min:0
    },
    cancelled: Boolean
})

const Subscriptions = mongoose.model("subscriptions", subscriptionSchema);


function validator(obj){
    const schema = {
        customerId: Joi.string().required(),
        courseId:Joi.string().required()
    }
    return Joi.validate(obj,schema)
}

module.exports.Subscriptions = Subscriptions;
module.exports.SubscriptionValidator = validator;