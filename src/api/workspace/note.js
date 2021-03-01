var express = require('express')

var router = express.Router()

var Note = require('../../models/Note')

router.use('/check', require('./check'))

router.post('/create', function(req, res) {
    Note.create({
        body: "Type away",
        workspace: req.body.id
    }).then( err => {
        res.send(err)
    })
    

});


router.post('/update', function(req, res) {
    data = req.body
    Note.updateOne({_id: data.id},{
        $set: { body: data.body }
    }).then((err)=>{
        res.send(err)
    })

});

router.post('/load', function(req, res) {
    data = req.body
    Note.findById(data.id).then((note)=>{

        res.send({
            id: data.id,
            body: note.body,
            checklist: note.checklist
        })
        
    })

});
////

router.post('/delete', function(req, res) {
    data = req.body
    Note.findOneAndDelete({_id: data.noteID}).then(err => {
        res.send(err)
    })

});





module.exports = router;



