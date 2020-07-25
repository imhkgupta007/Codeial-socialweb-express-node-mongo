const express = require('express');
const homeController = require('../controller/home_controller');

const router = express.Router();

console.log('router loaded');

router.get('/', homeController.home);
router.use('/users', require('./users'));
router.use('./posts', require('./posts'));

module.exports = router;