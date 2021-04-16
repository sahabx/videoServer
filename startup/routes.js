const homepage = require("../routes/homepage");
const departments = require("../routes/departments");
const customers = require("../routes/customers");
const courses = require("../routes/courses");
const subscriptions = require("../routes/subscriptions.js");
const auth = require("../routes/auth.js");
const users = require("../routes/users.js");
const error = require("../middleware/error.js");
const express = require("express");
const cancel = require("../routes/cancel.js")

module.exports = function(app){

    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    app.use(express.static('public'));
    app.use("/api/departments",departments);
    app.use("/api/customers",customers);
    app.use("/api/courses",courses);
    app.use("/api/subscriptions",subscriptions);
    app.use("/api/users",users);
    app.use("/api/auth",auth);
    app.use("/api/cancel",cancel);
    app.use("/",homepage);

    app.use(error)

}