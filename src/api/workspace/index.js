var express = require('express')
var router = express.Router()

var Note = require('../../models/Note')

router.use('/note', require('./note'))

router.get('/create', function(req, res) {
    notes = []
    
    res.send({
        notes: notes
    })
});

router.post('/load', function(req, res) {
    note_array = []
    Note.find({workspace: req.body.id}).then( (notes) => {
        res.send(notes)
    })
});


module.exports = router;