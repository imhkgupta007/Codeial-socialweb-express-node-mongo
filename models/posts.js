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
    }
}, {
    // Add created at and updated at fields in robo3t(DB)
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;