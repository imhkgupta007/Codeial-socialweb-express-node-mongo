const express = require('express');
const usersController = require('../controller/users_controllers');

const router = express.Router();

// router.get('/', usersController.profile);
router.get('/profile', usersController.profile);

module.exports = router;