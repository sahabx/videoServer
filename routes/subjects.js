const express = require("express");
const router = express.Router();
const Joi = require("joi")


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

router.get("/",(req,res)=>{
    res.send(subjects);
    console.log("Subjects enquired")
})

router.get("/:id",(req,res)=>{
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

router.post("/",(req,res)=>{

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
router.put("/:id",(req,res)=>{
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

router.delete("/:id",(req,res)=>{
    let result = subjects.find(e=> e.id === parseInt(req.params.id))
    if(!result){
        res.status(404).send("Invalid subject ID");
    }
    const deleteIndex = subjects.indexOf(result);
    subjects.splice(deleteIndex,1)
    res.send(result)
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




module.exports=router;