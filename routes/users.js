const express = require('express');
const usersController = require('../controller/users_controllers');

const router = express.Router();

router.get('/profile', usersController.profile);

router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);

router.post('/create', usersController.create);


module.exports = router;