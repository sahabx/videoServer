const express = require("express");
const log = require("./logger");
const auth = require("./authentication");
const morgan = require("morgan");
const helmet = require("helmet");
const config = require("config");
const app = express();
const Joi = require("joi");
const { urlencoded } = require("express");
const genDebug = require("debug")("myapp:general");
const specDebug = require("debug")("myapp:spec")

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
app.use(express.static('public'))

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


let subjects = [
    {id:1, name:"Science"},
    {id:2, name:"Math"},
    {id:3, name:"English"},
    {id:4, name:"Arabic"},
    {id:5, name:"Language Study"},
    {id:6, name:"Engineering"},
    {id:7, name:"Scocial Science"},
    {id:8, name:"IT"},
    {id:9, name:"Art"},
    {id:10, name:"Business"},
    {id:11, name:"Economics"}
]

/*******************************************
 * Setting up all GET routes
 * *****************************************/
app.get("/",(req,res)=>{
    //res.send("Home page"); //Send response without any template(raw);
    res.render("index",{title:"NODE PROJECT HOME PAGE",header:"HOME PAGE"})
    console.log("Home page provoked")
})


app.get("/api/subjects",(req,res)=>{
    res.send(subjects);
    console.log("Subjects enquired")
})

app.get("/api/subject/:id",(req,res)=>{
    let result = subjects.find(e=> e.id === parseInt(req.params.id))
    if(!result){
        res.status(404).send("Invalid subject ID");
    } else {
        res.send(result);
    }
    console.log("Single result query")
})

/*******************************************
 * Setting up POST routes
 * *****************************************/

app.post("/api/subjects",(req,res)=>{

    let input = inputValidation(req.body);

    if(input.error){
        res.send(input.error.details[0].message)
        return
    }

    let newSubject = {
        id: subjects.length +1,
        name: req.body.name
    }

    subjects.push(newSubject);
    res.send(newSubject);
})

/*******************************************
 * Setting up PUT routes
 * *****************************************/
app.put("/api/subject/:id",(req,res)=>{
    let result = subjects.find(e=> e.id === parseInt(req.params.id))
    let input = inputValidation(req.body);
    if(!result){
        res.status(404).send("Invalid subject ID");
        return
    }else if(input.error){
        res.send(input.error.details[0].message)
        return
    }

    result.name = req.body.name;
    res.send(result);
    
})


/*******************************************
 * Setting up Delete routes
 ******************************************/

app.delete("/api/subject/:id",(req,res)=>{
    let result = subjects.find(e=> e.id === parseInt(req.params.id))
    if(!result){
        res.status(404).send("Invalid subject ID");
    }
    const deleteIndex = subjects.indexOf(result);
    subjects.splice(deleteIndex,1)
    res.send(result)
})


/*******************************************
 * Declaring emit reciever
 ******************************************/
const port = process.env.PORT || 3000;

app.listen(port,(e)=>{
    console.log(`Listening on port: ${port}`)
})


/*******************************************
 * Input validation
 * *****************************************/

 function inputValidation(inputObject){
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(inputObject, schema);
 }



