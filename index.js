// Require the Express
const express = require('express');

// Require express-ejs-layouts
const expressLayouts = require('express-ejs-layouts');

// Require the MongoDB
const db = require('./config/mongoose');

// Require Cookie Parser
const cookieParser = require('cookie-parser');

// Create object for express
const app = express();

// Define the port
const port = 8000;

// Middleware encoder
app.use(express.urlencoded());

// Use Cookie Parser
app.use(cookieParser());

// Use express Layouts
app.use(expressLayouts);

// Use express router
app.use('/', require('./routes'));

// Add statics files
app.use(express.static('./assets'));

// Extract style and scripts from sub pages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Set up view Engine
app.set('view engine', 'ejs');

// Set up view location
app.set('views', './views');

// Fire up the server
app.listen(port, function(err) {
    if(err) {
        console.log(`Error in running ${err}`);
    }

    console.log(`Server is up and running on port: ${port}`);
});
