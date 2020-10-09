const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

// Tells passport to use a new strategy for google login
passport.use(new googleStrategy({
        clientID: '87046662542-6skkbmq3ehsned3d8oefn4i1pgoh85t5.apps.googleusercontent.com',
        clientSecret: 'sBja8d3HI9e1ti1tpe7LHgLJ',
        callbackURL: 'http://localhost:8100/users/auth/google/callback',
    }, 
    function(accessToken, refreshToken, profile, done) {
        // Find a user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user) {
            if (err) {
                console.log('error in google strategy-passport', err);
                return;
            }
            console.log(accessToken, refreshToken);
            console.log(profile);

            if(user) {
                // If found, set this user as req.user
                return done(null,user);
            } else {
                // If not found, create a user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function (err, user) {
                    if (err) {
                        console.log('Error in creating user from Google Strategy', err);
                        return;
                    }
                    return done(null, user);
                });
            }
        });
    }
));

module.exports = passport;