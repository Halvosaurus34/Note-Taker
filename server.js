const express = require("express");
const uuid = require("uuid");
const app = express();
const fs = require("fs");

var PORT = process.env.PORT || 3001;
// will share any static html files with the browser
app.use(express.static("public"));
// accept incoming POST requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const dbFile = "./app/db.json";
let readNoteList = JSON.parse(fs.readFileSync(dbFile, "utf8"));
let noteList = [
  { id: "0000-0000-0000-0000", title: "note1", text: "note1 text" },
];

//retreive note array from JSON database
app.get("/api/notes", async function (req, res) {
  console.log("getting data...");
  res.send(readNoteList);
});

//create a note and add to JSON file
app.post("/api/notes", async function (req, res) {
  class NewNote {
    constructor(id, title, text) {
      this.id = id;
      this.title = title;
      this.text = text;
    }
  }
  let noteList = [];
  let newNote = new NewNote(uuid.v4(), req.body.title, req.body.text);
  //   console.log("NEWNOTE: ", newNote);
  noteList = readNoteList;
  noteList.push(newNote);
  //   console.log("NOTE ARRAY: ", noteList);
  fs.writeFileSync(dbFile, JSON.stringify(noteList));
  console.log("Successfully added new note...");
  res.send({ message: "added note..." });
});

//delete note and rewrite that to JSON file
app.delete("/api/notes/:id", async function (req, res) {
  //   console.log("DELETED NOTE REQUEST ID: ", req.params.id);
  let result = readNoteList.map(function (el) {
    if (el.id == req.params.id) {
      //   console.log(`Matched search id: ${req.params.id} with db id: ${el.id}`);
      readNoteList.splice(readNoteList.indexOf(el), 1);
      fs.writeFileSync(dbFile, JSON.stringify(readNoteList));
      console.log("Delete Successfull...");
    } else {
      console.log("Unable to find that id!");
    }
  });
  res.send({ message: "deleted" });
});

app.listen(PORT, function () {
  console.log(`Serving notes on PORT ${PORT}, http://localhost:${PORT}`);
});
