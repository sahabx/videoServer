const express = require("express");
const app = express();
const winston = require("winston")

require("./startup/logging.js")();
require("./startup/routes.js")(app);
require("./startup/db.js")();
require("./startup/config.js")();

/*******************************************
 * Declaring emit reciever
 ******************************************/
const port = process.env.PORT || 2000;


const server = app.listen(port,(e)=>{
    winston.info(`Listening on port: ${port}`)
})

module.exports = server