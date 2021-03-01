const express = require('express');
const User = require('../models/User')

var router = express.Router()

router.get('/', (req, res) => {
    if(req.session.userID) {  
        User.findById(req.session.userID).then(user => {
            if(user){
                res.send({id: req.session.userID} )
            }
        })
    }
    else {
        res.status(401).send("")
    }
})

module.exports = router