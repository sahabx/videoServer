const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost/learnerAid')
    .then(()=>{console.log("database connection successful")})
    .catch((err)=>{console.log("database connection failed",err)});


const courseSchema = new mongoose.Schema({
    title:String,
    publisher:String,
    tags:[String],
    date:{type: Date, default: Date.now},
    views: Number
    
})

const courseSchema2 = new mongoose.Schema({
    name:String,
    author:String,
    tags:[String],
    date:{type: Date, default: Date.now},
    isPublished: Boolean

})

const Course = mongoose.model("Course", courseSchema2);
const course =  new Course({
        title: "Mother Cat",
        publisher: "The Lilyot",
        tags:["Funny", "Cute", "Pet"],
        views:8800
})



let i =0;
async function createCourse(){
    (await Course.find({author:/^T/})).forEach((doc)=>{
        i++;
        console.log(i+" "+doc.author)
    })

}

createCourse();






console.log(Math.random()*10000)

