const express = require('express');
const env = require('./config/environment');
const logger = require('morgan');

const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
require('./config/view-helpers')(app);

const port = 8100;

const expressLayouts = require('express-ejs-layouts');

const db = require('./config/mongoose');

const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

// MongoStore takes express session as its parameter
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
// require the custom made middleware for flash
const customMware = require('./config/middleware');

// Setting up chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');
const path = require('path');

app.use(cors());

// Sass Middleware
// app.use(sassMiddleware({
//     src: './assets/scss',
//     dest: './assets/css',
//     debug: true,
//     outputStyle: 'extended',
//     prefix: '/css'
// }));
if (env.name == 'development'){
    app.use(sassMiddleware({
        src: path.join(__dirname, env.asset_path, 'scss'),
        dest: path.join(__dirname, env.asset_path, 'css'),
        debug: true,
        outputStyle: 'extended',
        prefix: '/css'
    }));
}

// Middleware encoder
app.use(express.urlencoded());
// Use Cookie Parser
app.use(cookieParser());
// Add statics files
app.use(express.static(env.asset_path));
// Add static uploaded files or making uploads path available for the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(logger(env.morgan.mode, env.morgan.options));

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
    secret: env.session_cookie_key,
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
app.use(customMware.setFlash);



// Use express router
app.use('/', require('./routes'));

// Fire up the server
app.listen(port, function(err) {
    if(err) {
        console.log(`Error in running ${err}`);
    }

    console.log(`Server is up and running on port: ${port}`);
});
