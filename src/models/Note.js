const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var noteSchema = new Schema({
  checklist: { 
    type : Array,
    "default" : [] 
  },
  body: {
    type: String
  },
  
  workspace: {
    type: String
  }
});

module.exports = mongoose.model('notes', noteSchema );