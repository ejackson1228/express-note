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

function findById(req.params.id, notes);


module.exports = createNewNote