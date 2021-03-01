const express = require('express');

const router = express.Router();

router.use('/login', require('./login'));
router.use('/logout', require('./logout'));
router.use('/register', require('./register'));

module.exports = router;
