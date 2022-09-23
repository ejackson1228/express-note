const { notes } = require('../db/db.json')
const router = require('express').Router()
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const createNewNote = require('../lib/notes')


router.get('/notes', (req, res) => { // get the notes objects as a response
    const rFile = fs.readFileSync('./db/db.json', {encoding: 'utf-8'});
    res.send(rFile);
})

router.post('/notes', (req, res) => { //post request for new note
    req.body.id = uuidv4();

    const note = createNewNote(req.body, notes);

    res.json(note)
});

module.exports = router;
