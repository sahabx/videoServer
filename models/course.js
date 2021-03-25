const mongoose = require("mongoose");
const Joi = require("Joi");
const {departmentSchema} = require("./department.js")


const courseSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        minlength:3,
        maxlength:50
    },
    department:{
        type: departmentSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min:0,
        max:1000
    },
    monthlySubscriptionRate:{
        type: Number,
        required: true,
        min:0,
        max:100000
    }
})

const Courses = mongoose.model("courses",courseSchema);

function courseValidator(course){
    const schema = {
        title: Joi.string().min(3).required(),
        departmentId: Joi.string().required(),
        numberInStock: Joi.number().required(),
        monthlySubscriptionRate: Joi.number().required()
    }
    return Joi.validate(course,schema)
}

module.exports.Courses = Courses;
module.exports.courseValidators = courseValidator;