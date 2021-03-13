const express = require("express");
const router = express.Router();

router.get("/",(req,res)=>{
    res.send("Home page"); //Send response without any template(raw);
    console.log("Home page provoked")
})

module.exports = router;