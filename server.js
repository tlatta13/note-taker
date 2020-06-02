const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 8080;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
})

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
})

app.get("/api/notes", function(req, res) {
    let json = pullJSON();
    res.json(json);
    console.log(json)
});

app.post("/api/notes", function(req, res) {
});

app.delete("/api/notes/:id", function(req, res) {

});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
})


function pullJSON() {
    let note = fs.readFileSync(__dirname + "/db/db.json");
    let json = JSON.parse(note);
    return json;
}

function newNoteObj(data) {

}

function addNote(data) {

}

function saveNote() {

}

function deleteNote() {
    
}