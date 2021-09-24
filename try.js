const fs = require('fs');
const chalk = require('chalk');

//! Add Note..
const addNote = (title, body) => {
    const notes = loadNote();
    const duplicateNote = notes.find((note) => {
        return note.title === title;
    });
    if (duplicateNote === undefined) {
        console.log("Added");
        notes.push({
            title: title,
            note: body
        });
        saveNote(notes);
    } else {
        console.log("Note Already Existed");
    }
};

//!Save Note..
const saveNote = (notes) => {
    const note = JSON.stringify(notes);
    fs.writeFileSync("notes.json", note);
};

//! load Note..
const loadNote = () => {
    try {
        const jsonNote = fs.readFileSync('notes.json', 'utf-8');
        const note = JSON.parse(jsonNote);
        return note
    } catch (err) {
        return [];
    }
};


//! Remove Note..
const removeNote = (title) => {
    const allNotes = loadNote();
    const notesToKeep = allNotes.filter(note => {
        return note.title !== title;
    });
    if (notesToKeep.length < allNotes.length) {
        saveNote(notesToKeep);
        console.log("Note Removed");
    } else {
        console.log("Note doesn't exist");
    }
}

const getAllNotes = () => {
    const notes = loadNote();
    notes.forEach(note => {
        console.log(chalk.magenta.inverse(`Title: ${note.title}`), chalk.greenBright.inverse(`Note: ${note.note}`));
    });
}

const readNote = (title) => {
    const notes = loadNote();
    const getNote = notes.find(note => note.title === title);
    if (getNote !== undefined) {
        console.log(getNote);
    } else {
        console.log("Not Found");
    }
}

module.exports = { readNote, addNote, removeNote, getAllNotes }