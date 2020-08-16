const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;   

const User = require('../models/user');

// AUTHENTICATION USING PASSPORTJS
// Looking for user
passport.use(new LocalStrategy({    // Telling passport to use localstrategy
        usernameField: 'email'  // Email field will be used to search
    },
    function(email, password, done) {
        // find a user and establish a connection
        User.findOne({email: email}, function(err, user) {
            if(err) {
                console.log('Error in finding user --> Passport');
                return done(err);
            }
            // If user is not found
            if (!User || user.password != password) {
                console.log('Invalid username/password');
                return done(null, false);
            }
            // If user is found
            return done(null, user);
        });
    }
));

// Serializing the user to decide which key is to be kept into cookies as a primary key to find user
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// When next request came
// deserializing the user from the key in the cookies to find and send the said user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        if(err) {
            console.log('Error in finding user --> Passport');
        }
        return done(null, user);
    });
});

// Check if the user is authenticated we build a middleware function
passport.checkAuthentication = function(req, res, next) {
    // If the user is signed in, pass over the request to next function(controller's action) defined in router file
    if (req.isAuthenticated()) {
        return next();
    }
    // If user is not signed in
    return res.redirect('/users/sign-in');
}

// If user is authenticated below middleware is used
passport.setAutheticatedUser = function(req, res, next) {
    if (req.isAuthenticated()) {
        // req.user contain the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;