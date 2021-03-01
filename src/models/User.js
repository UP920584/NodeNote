const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: {
    type: String
  },
  passwd: {
    type: String
  },
  name: {
    type: String
  },
  workspaces: { 
    type : Array,
    "default" : [] 
  },

});

module.exports = mongoose.model('users', userSchema );