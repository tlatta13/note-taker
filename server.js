const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let notes = JSON.parse(fs.readFileSync(__dirname + "/db/db.json", (err) => {
    if(err) throw err;
}));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    // const note = require("./db/db.json");
    const note = JSON.parse(fs.readFileSync(__dirname + "/db/db.json"));
    return res.json(note);
});

app.post("/api/notes", function(req, res) {
    let newNote = req.body;
    newNote.id = notes.length + 1;
    console.log(newNote);
    notes.push(newNote); 
    
    fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(notes, null, 2), (err) => {
        if(err) throw err;
    });

    res.json(true);
});

app.delete("/api/notes/:id", function(req, res) {
    const id = parseInt(req.params.id);
    let newID = 0

    notes = notes.filter(function(note) {
        return note.id !== id;
    })

    for (note of notes) {
        note.id = newID;
        newID++;
    }
    res.json(true)

    fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(notes, null, 2), (err) => {
        if(err) throw err;
    })
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});