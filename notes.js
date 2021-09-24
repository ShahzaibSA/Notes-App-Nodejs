const fs = require('fs');
const chalk = require('chalk');

const addNotes = (title, body) => {
    const notes = loadNotes();
    // const duplicateNotes = notes.filter((note) => note.title === title);
    const duplicateNote = notes.find(note => {
        return note.title === title;
    })

    debugger

    if (!duplicateNote) {
        notes.push({
            title: title,
            note: body
        });
        saveNote(notes);
        console.log(chalk.green.inverse("Your Note Successfully Added..!!"));
    } else {
        console.log(chalk.red.inverse("Note Already Existed..!!"));
    }
}

const saveNote = (notes) => {
    const note = JSON.stringify(notes);
    fs.writeFileSync('notes.json', note);
}

const getAllNotes = () => {
    const notes = loadNotes();
    notes.forEach(note => {
        console.log(chalk.magenta.inverse(`Title: ${note.title}`), chalk.greenBright.inverse(`Note: ${note.note}`));
    });
    // console.log(allNotes);
};

//! Read Note
const readNote = (title) => {
    const notes = loadNotes();
    const getNote = notes.find(note => note.title === title);
    if (getNote === undefined) {
        console.log(chalk.red.inverse("Note Does'nt Existed..!!"));
    } else {
        console.log(
            chalk.magenta.inverse(`Title: ${getNote.title}`),
            chalk.greenBright.inverse(`Note: ${getNote.note}`)
        );

    }



}

const loadNotes = () => {
    try {
        const jsonNote = fs.readFileSync("notes.json", "utf-8");
        const notes = JSON.parse(jsonNote);
        return notes;
    } catch (err) {
        return [];
    };
};

const removeNote = (title) => {
    const allNotes = loadNotes();
    const notesToKeep = allNotes.filter(notes => notes.title !== title);
    if (allNotes.length > notesToKeep.length) {
        console.log(chalk.red.inverse("Note Removed"));
        saveNote(notesToKeep);
    } else {
        console.log(chalk.yellow.inverse("Note dose'nt existed..!!"));
    };
};


module.exports = { addNotes, removeNote, getAllNotes, readNote };

