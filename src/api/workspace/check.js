var express = require('express')

var router = express.Router()

var Note = require('../../models/Note')

router.post('/create', function(req, res) {
    data = req.body
    checkbox = {
        task : "New checker", 
        isChecked : false 
    }
    Note.updateOne({_id: data.id}, {
        $push: { checklist: checkbox }
    }).then(()=>{
        res.send("pass")
    })
    
});
router.post('/delete', function(req, res) {
    data = req.body
    Note.findOne({_id: data.noteID}).then(note => {
        
        note.checklist.splice(data.index, 1)
        Note.updateOne({_id: data.noteID},{
            $set: { checklist: note.checklist }
        }).then((err) => {
            res.send(err)
        })
    })
});
router.post('/update', function(req, res) {
    data = req.body
    Note.findOne({_id: data.noteID}).then(note => {
        note.checklist[data.index] = {
            task : data.task,
            isChecked : data.isChecked  
        }
        Note.updateOne({_id: data.noteID},{
            $set: { checklist: note.checklist }
        }).then((err) => {
            res.send(err)
        })
    })

});


module.exports = router;