const { notes } = require('../db/db.json');
const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { createNewNote, findById, validateNote } = require('../lib/notes');


router.get('/notes', (req, res) => { // get the notes objects as a response
    const rFile = fs.readFileSync('./db/db.json', {encoding: 'utf-8'});
    res.send(rFile);
})

router.get('/notes/:id', (req, res) => { // get a specific object by id as response
    notesArray = fs.readFileSync('./db/db.json');
    const result = findById(req.params.id, notesArray);
    if (result) {
        res.json(result);
    } else {
        res.sendStatus(404);
    };
});

router.post('/notes', (req, res) => { //post request for new note
    /* fs.readFileSync('./db/db.json', {encoding: 'utf-8'}); */
    req.body.id = uuidv4(); // randomized id generator

    if (!validateNote(req.body))  {
        res.status(400).send("This note is not formatted properly!");
    } else { 
    const note = createNewNote(req.body, notes);

    res.json(note);
    }
});

router.delete('/notes/:id', (req, res) => { // <<< :id is established in deleteNote() @ index.js line 45
    if (req.params.id) {
    var removeNote = req.params.id; // requested note to remove by id
    var data = fs.readFileSync('./db/db.json', {encoding: 'utf-8'}); //read current json file
    data = notes.filter((note) => { return note.id !== removeNote}); // return a new file with every object except the one being removed
    fs.writeFileSync('./db/db.json', JSON.stringify({ notes: data }, null, 2)); // write this new file to db.json
    return res.status(200).send(`Note Deleted!`);
    } else {
        return res.status(404).send("Error: Note not found!");
    }
    
});

module.exports = router;
