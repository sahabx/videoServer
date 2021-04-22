const express = require("express");
const app = express();
const winston = require("winston")

require("./startup/logging.js")();
require("./startup/routes.js")(app);
require("./startup/db.js")();
require("./startup/config.js")();
require("./startup/prod.js")(app);

/*******************************************
 * Declaring emit reciever
 ******************************************/
const port = process.env.PORT || 3000;


const server = app.listen(port,(e)=>{
    winston.info(`Listening on port: ${port}`)
})

module.exports = server