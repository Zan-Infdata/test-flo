// importing the dependencies

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// define global root directory
var path = require('path');
global.__rootname = path.resolve(__dirname);

// defining the Express app
const app = express();



/**
 * API routing
 */

const apiRouter = require("./src/routes/api");
app.use("/", apiRouter);


  

// starting the server
app.listen(3003, () => {
    console.log('listening on port 3003');
});