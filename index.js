const mongoose = require("mongoose")
const express = require("express");
const log = require("./middleware/logger");
//const auth = require("./middleware/authentication");
const morgan = require("morgan");
const helmet = require("helmet");
const config = require("config");
const app = express();
const Joi = require("joi");
const { urlencoded } = require("express");
const genDebug = require("debug")("myapp:general");
const specDebug = require("debug")("myapp:spec");
const homepage = require("./routes/homepage");
const departments = require("./routes/departments");
const customers = require("./routes/customers");
const courses = require("./routes/courses");
const subscriptions = require("./routes/subscriptions.js");
const auth = require("./routes/auth.js");
const users = require("./routes/users.js");
const boolean = require("joi/lib/types/boolean");

/******************************************
 *  Checking environmental variable 
 *  The app crashes if the environmental
 *  is not declared
 *******************************************/


if(!config.get("jwtPrivateKey")){
    console.log("FATAL ERROR: jwtPrivateKey was not declared");
    process.exit(1)
}



/******************************************
 *  Connecting with mongoDB
 *******************************************/

 mongoose.connect('mongodb://localhost/learnerAid')
    .then(()=>{console.log("database connection successful")})
    .catch((err)=>{console.log("database connection failed",err)})


/******************************************
 *  mongoDB schema
 *******************************************/
const courseSchema = new mongoose.Schema({
    name:String,
    author:String,
    tags:[String],
    date:{type: Date, default: Date.now},
    isPublished: Boolean

})

const Course = mongoose.model("Course",courseSchema);
const course =  new Course({
        name: "Medieval History",
        author: "Abdur Rashid",
        tags:["Philosophy", "Psychology", "Civilization"],
        isPublished:1
})

async function createCourse(){
   
    //const result = await Course.updateOne({author:"Myra Snow"},{name:"lalalala"})
    //console.log(result)
}

createCourse();

function CourseDbUpdate(e){
    Course.updateOne({_id:e._id},{$set:{date: new Date()}})
}


/******************************************
 *  Checking debug module
 *******************************************/
genDebug("General note acknowledgement 1");
specDebug("Special note with speacial messages");
genDebug("General note acknowledgement 1");
specDebug("Special note with speacial messages")
genDebug("General note acknowledgement 1")




/******************************************
 *  Development Environment & Configuration
 *******************************************/
 //console.log(`env collected directly: ${process.env.NODE_ENV}`);
 //console.log(`env from app.get: ${app.get("env")}`);
 console.log("Applicaton name"+config.get("name"));
 console.log("Mail server"+config.get("mail.host"));
 console.log("password"+config.get("mail.password"));

/******************************************
 *  Template engine
 *******************************************/
app.set("view engine", "pug");
app.set("views","./views");

 /******************************************
 *  Built in middleware
 *******************************************/
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use("/api/departments",departments);
app.use("/api/customers",customers);
app.use("/api/courses",courses);
app.use("/api/subscriptions",subscriptions);
app.use("/api/users",users);
app.use("/api/auth",auth);
app.use("/",homepage);

/******************************************
 *  Custom middleware
 *******************************************/
app.use(log);
app.use(auth);

/******************************************
 *  third party middleware
 *******************************************/
app.use(helmet());
if(app.get("env") == "development"){
    app.use(morgan("combined"));
    console.log("Development Environment: extra middleware MOROGAN activated")
}

/*******************************************
 * Setting up all GET routes
 * *****************************************/

 // GET routes have been moved to respective route folder



/*******************************************
 * Declaring emit reciever
 ******************************************/
const port = process.env.PORT || 3000;

app.listen(port,(e)=>{
    console.log(`Listening on port: ${port}`)
})



/*******************************************
 * MongoDB row update with unique data
 * that actually worked
 ******************************************/

    //  (await Course.find()).forEach((doc)=>{
    //      doc.date = new Date((new Date()) - (new Date(Math.random()*500000000000)));
    //      doc.save()
    //      console.log(doc._id+": changed")
    //  });