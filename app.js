const yargs = require("yargs");
const { addNotes, removeNote, getAllNotes, readNote } = require("./notes");
// const { addNote, removeNote, getAllNotes, readNote } = require("./try");
// loadNote

//! Add Note..
yargs.command({
    command: "add",
    describe: "Add Note",
    builder: {
        title: {
            describe: "Title",
            demandOption: true,
            type: "string"
        },
        body: {
            describe: "Note",
            demandOption: true,
            type: "string"
        }
    },
    handler: function (argv) {
        addNotes(argv.title, argv.body);
    }
});

//! Load All Notes..
yargs.command({
    command: "load",
    describe: "Loads All Notes",
    // builder: {}
    handler() {
        getAllNotes();
    }
});

//! Read Note..
yargs.command({
    command: "read",
    describe: "Read only specified Task",
    builder: {
        title: {
            describe: "Title",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        readNote(argv.title);
    }
});

//! Remove Note..
yargs.command({
    command: "remove",
    describe: "Remove Note",
    builder: {
        title: {
            describe: "Title",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        removeNote(argv.title);
    }

});


yargs.parse();