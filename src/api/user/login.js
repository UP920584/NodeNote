const express = require('express');
const bcrypt = require('bcrypt')

var router = express.Router()
var User = require('../../models/User')

router.post('/', function(req, res) {
    //res.header("Access-Control-Allow-Origin", "*");

    // lookup user
    userData = req.body
    try {
        //address = new MailAddress(userData.email).Address;
        User.findOne({email: userData.email}).then(user => {
            if(user){
                bcrypt.compare(userData.passwd, user.passwd, (err, result) =>{
                    if(result){
                        req.session.userID = user._id // todo: replace with better key
                        if(req.session.userID){
                            res.send({id: user._id})                      
                        } else {
                            console.log("failed")
                        }
                    }else {
                        return res.send({error: "Invalid password", user: userData})
                    }
                });
            } else {
                return res.send({error: "User not found", user: userData})
            }
        })
    } catch(FormatException) {
        return res.send({error: "Invalid email format.", user: userData})
    }//
})

module.exports = router
    