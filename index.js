// Require the Express
const express = require('express');
// Create object for express
const app = express();
// Define the port
const port = 8100;

// Require express-ejs-layouts
const expressLayouts = require('express-ejs-layouts');
// Require Cookie Parser
const cookieParser = require('cookie-parser');

// Require the MongoDB
const db = require('./config/mongoose');

// Used for session cookie
const session = require('express-session');
// require Passport for authentication
const passport = require('passport');
// require passport-local-strategy file
const passportLocal = require('./config/passport-local-strategy');
// MongoStore takes express session as its parameter
const MongoStore = require('connect-mongo')(session);
// require Sass Middleware
const sassMiddleware = require('node-sass-middleware');
// require Connect-Flash Middleware
const flash = require('connect-flash');

// Sass Middleware
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}));
// Middleware encoder
app.use(express.urlencoded());
// Use Cookie Parser
app.use(cookieParser());
// Add statics files
app.use(express.static('./assets'));

// Use express Layouts
app.use(expressLayouts);
// Extract style and scripts from sub pages into layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Set up view Engine
app.set('view engine', 'ejs');
// Set up view location
app.set('views', './views');

// MongoStore is used to store the session cookie in the database
app.use(session({
    name: 'codeial',
    // TODO - change it before deployment in production mode
    secret: 'something',
    saveUninitialized: false,   // when user has not logged in (or initialized) dont save additional data 
    resave: false,  // Do not save same data(rewrite) again and again
    cookie: {
        maxAge: (1000 * 60 * 100)   // Age of cookie
    },
    store: new MongoStore(
        {
        mongooseConnection: db,
        autoRemove: 'disabled'
        },
        function(err) {
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

// Middlewares for passport authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAutheticatedUser);
app.use(flash());

// Use express router
app.use('/', require('./routes'));

// Fire up the server
app.listen(port, function(err) {
    if(err) {
        console.log(`Error in running ${err}`);
    }

    console.log(`Server is up and running on port: ${port}`);
});
