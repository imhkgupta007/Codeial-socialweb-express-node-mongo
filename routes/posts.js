const express = require('express');
const postController = require('../controller/posts_controller');

const router = express.Router();

// console.log('into posts');
// router.get('/', postController.post);
router.get('/post', postController.post);

module.exports = router;