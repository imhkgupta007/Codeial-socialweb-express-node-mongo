const User = require('../models/user')

// Render the profile page
module.exports.profile = function(req, res) {
    res.render('user_profile', {
        title: "User Profile"
    });
}

// Render the Sign Up page
module.exports.signUp = function(req, res) {
    if(req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: 'Sign Up'
    });
}

// Render the sign In Page
module.exports.signIn = function(req, res) {
    if(req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title: 'Sign In'
    })
}

// Get the sign up data
module.exports.create = function(req, res) {
    // Check whether password and confirm password are same
    if(req.body.password != req.body.confirm_password) {
       return res.redirect('back');
    }

    // find by 'email' of req.body.email
    User.findOne({email: req.body.email}, function(err, user) {
        if(err) {
            console.log('error in finding user in signing up');
            return;
        }

        // If user not found create a user
        if(!user) {
            User.create(req.body, function(err, user) {
                if(err) {
                    console.log('error in creating while signing up');
                    return;
                }

                // when user is created go to sign in page
                return res.redirect('./sign-in');
            });
        } 
        else {
            return res.redirect('back');
        }
    });
}

// Sign In and create a session for user later
module.exports.createSession = function(req, res) {
    return res.redirect('/');
}

module.exports.destroySession = function(req, res) {
    req.logout();
    
    return res.redirect('/');
}