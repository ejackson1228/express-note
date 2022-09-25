const { notes } = require('../db/db.json')
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { createNewNote, findById, validateNote, deleteNote } = require('../lib/notes')
const path = require('path');


router.get('/notes', (req, res) => { // get the notes objects as a response
    const rFile = fs.readFileSync('./db/db.json', {encoding: 'utf-8'});
    res.send(rFile);
})

router.get('/notes/:id', (req, res) => {
    notesArray = fs.readFileSync('./db/db.json');
    const result = findById(req.params.id, notesArray);
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404);
    };
});

router.post('/notes', (req, res) => { //post request for new note
    fs.readFileSync('./db/db.json');
    req.body.id = uuidv4();

    if (!validateNote(req.body))  {
        res.status(400).send("This note is not formatted properly!");
    } else { 
    const note = createNewNote(req.body, notes);

    res.json(note);
    }
});

router.delete('/notes/:id', (req, res) => { // <<< :id is established in deleteNote() @ index.js line 45
    if (req.params.id) {
    var removeNote = req.params.id;
    var data = fs.readFileSync('./db/db.json', {encoding: 'utf-8'});
    data = notes.filter((note) => { return note.id !== removeNote});
    fs.writeFileSync('./db/db.json', JSON.stringify({ notes: data }, null, 2));
    return res.status(200).send(`Note Deleted!`);
    } else {
        return res.status(404).send("Error: Note not found!");
    }
    
});

module.exports = router;
