const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    // Linking to User
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // include the arrays of all ids of all comments in post schema itself
    comments: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
        }
    ],
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
}, {
    // Add created at and updated at fields in robo3t(DB)
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;