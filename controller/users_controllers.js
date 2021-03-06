const User = require('../models/user');
const path = require('path');
const fs = require('fs');

// Render the profile page
module.exports.profile = function(req, res) {
    User.findById(req.params.id, function(err, user) {
        res.render('user_profile', {
            title: "User Profile",
            profile_user: user
        });
    });
}

// Render the update function
// module.exports.update = async function(req, res) {
    // if(req.user.id == req.params.id) {
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
    //         return res.redirect('back');
    //     });
    // } else {
        // req.flash('error', "Unauthorized");
        // return res.status(401).send('Unauthorized');
    // }

module.exports.update = async function(req, res) {
    if(req.user.id == req.params.id) {
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function (err) {
                if (err) {
                    console.log('Multer error: ', err);
                }
                // console.log(req.file);
                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file) {

                    if (user.avatar) {
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }

                    // this is saving the path of the uploaded file into avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            })

        } catch (err) {
            req.flash('error', err);
            return res.redirect('back');
        }

    } else {
        req.flash('error', "Unauthorized");
        return res.status(401).send('Unauthorized');
    }

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
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }

    // find by 'email' of req.body.email
    User.findOne({email: req.body.email}, function(err, user) {
        if(err) {
            req.flash('error', err);
            return;
        }

        // If user not found create a user
        if(!user) {
            User.create(req.body, function(err, user) {
                if(err) {
                    req.flash('error', err);
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
    req.flash('success', 'Logged in successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res) {
    req.logout();
    req.flash('success', 'You have been logged out');
    
    return res.redirect('/');
}