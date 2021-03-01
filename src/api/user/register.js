const express = require('express');
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

var User = require('../../models/User')
var Note = require('../../models/Note')

const app = express();
var router = express.Router()

router.post('/', (req, res) => {
    userData = req.body;
    User.findOne({email: userData.email}).then(user => {
        errors = [];
        if(user){
            errors.push("A user with this email already exists")
        }
 
        if(userData.passwd != userData.passwd2) {
            // this will later use bcrypt, amongst other validation
            errors.push("Passwords do not match")
        } 
        try {
            //address = new MailAddress(userData.email).Address;
        } catch(FormatException) {
            errors.push("Email is invalid")
        }

        
        if(errors.length == 0) {
            bcrypt.hash(userData.passwd, 10, (err, hash) => {
                id = mongoose.mongo.ObjectID()
                Note.create({
                    workspace: id
                })
                User.create({
                    _id: id,
                    email: userData.email,
                    passwd: hash,
                    name: userData.name
                })
                req.session.userID = id
                res.send(id)
            });
        } else {
            return res.send({
                errors: errors,
                user: userData
            })
        }
        
    })
})

module.exports = router