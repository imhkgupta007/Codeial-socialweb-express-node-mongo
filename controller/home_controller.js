const Post = require('../models/posts');

module.exports.home = function(req, res) {
    // console.log(req.cookies);
    // res.cookie  ('user_id', 44)

    // Post.find({} , function(err, posts) {
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts: posts
    //     });
    // });

    // Populate the user of each post in database
    Post.find({}).populate('user').exec(function(err, posts) {
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts
        });
    });

}