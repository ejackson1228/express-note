const fs = require('fs');
const path = require('path');

function createNewNote(body, notesArray) {
    console.log(body);

    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id = id)[0]; 
    return result;
}

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    if (!note.id || typeof note.id !== 'string'){
        return false;
    }
    return true;
}

function deleteNote(id, notesArray) {
    let noteById = findById(id, notesArray); // need to figure out delete logic and route
    notesArray.splice(noteById, 1);
    console.log(notesArray);
    
    // const noteById = notesArray.splice(note => note.id = id, 1);
    // console.log(noteById);
    // if (!noteById) {
    //     return false;
    // } else {
    //     return !!notesArray.splice(noteById, 1);
    // }
    
}


module.exports = { createNewNote, findById, validateNote, deleteNote }