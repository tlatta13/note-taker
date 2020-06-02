const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 8080;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const notes = JSON.parse(fs.readFileSync(__dirname + "/db/db.json", "utf-8", (err) => {
    if(err) throw err;
})) || {};

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
})

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
})

app.get("/api/notes", function (req, res) {
    const note = fs.readFileSync(__dirname + "/db/db.json");
    return res.json(note);
});

app.post("/api/notes", function(req, res) {
    let newNote = req.body;
    newNote.id = notes.length + 1;
    console.log(newNote);
    notes.push(newNote); 

    fs.writeFileSync(__dirname + "/db/db.json", JSON.stringify(notes, null, 2), (err) => {
        if(err) throw err;
    })

    return res.json(notes);
})

// app.delete("/api/notes/:id", function(req, res) {
//     let removeNote = req.params.id;
//     return res.json();
// });

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
})