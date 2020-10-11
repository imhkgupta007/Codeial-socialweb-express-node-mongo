const Post = require('../models/posts');
const User = require('../models/user');

// module.exports.home = function(req, res) {
//     console.log(req.cookies);
//     res.cookie  ('user_id', 44)

//     Post.find({} , function(err, posts) {
//         return res.render('home', {
//             title: "Codeial | Home",
//             posts: posts
//         });
//     });
// }

// module.exports.home = function(req, res) {

//     // Populate the user of each post in database
//     Post.find({})
//     .populate('user')
//     .populate({
//         path: 'comments',
//         populate: {
//             path: 'user'
//         }
//     })
//     .exec(function(err, posts) {

//         User.find({}, function(err, users) {
//             return res.render('home', {
//                 title: "Codeial | Home",
//                 posts: posts,
//                 all_users: users
//             });
//         });
//     });
// }

module.exports.home = async function(req, res) {

    try {
        // Populate the user of each post in database
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

        let users = await User.find({});

        return res.render('home', {
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        });
        
    } catch (err) {
        console.log("Error", err);
        return;
    }

}

// module.exports.actionName = function(req, res){}


// using then
// Post.find({}).populate('comments').then(function());

// let posts = Post.find({}).populate('comments').exec();

// posts.then()
