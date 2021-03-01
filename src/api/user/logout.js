const express = require('express');

const app = express();

var router = express.Router()

router.get('/', function(req, res) {
    req.session.userID = ""
    res.send()
})

module.exports = router
