const express = require('express');
const router = express.Router();

const commentsController = require('../controller/comments_controller');
const passport = require('passport');

router.post('/create', passport.checkAuthentication, commentsController.create);

module.exports = router;
