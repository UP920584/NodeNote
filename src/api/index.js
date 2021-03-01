const express = require('express');

const app = express();
const router = express.Router();

router.use('/workspace', require('./workspace/index'))
router.use('/user', require('./user/index'))
router.use('/auth', require('./auth'))

module.exports = router;
