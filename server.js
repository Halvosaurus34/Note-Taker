const express = require("express");
const uuid = require("uuid");
const app = express();
const fs = require("fs");

const PORT = 3000; // process.env.PORT ?

// will share any static html files with the browser
app.use(express.static("public"));
// accept incoming POST requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

class NewNote {
  constructor(id, title, text) {
    this.id = id;
    this.title = title;
    this.text = text;
  }
}

const dbFile = "./app/db.json";
let readNoteList = JSON.parse(fs.readFileSync(dbFile, "utf8"));
let id = 0;
let noteList = [
  { id: "0000-0000-0000-0000", title: "note1", text: "note1 text" },
];

// Endpoints =================================================
app.get("/api/notes", async function (req, res) {
  console.log("getting data...", readNoteList[0]);
  res.send(readNoteList);
});

app.post("/api/notes", async function (req, res) {
  // ... code ... ?
  class NewNote {
    constructor(id, title, text) {
      this.id = id;
      this.title = title;
      this.text = text;
    }
  }

  let newNote = new NewNote(uuid.v4(), req.body.title, req.body.text);
  console.log("NEWNOTE: ", newNote);
  noteList.push(newNote);
  console.log("NOTE ARRAY: ", noteList);
  fs.writeFileSync(dbFile, JSON.stringify(noteList));
  id++;
  res.send({ message: "added note..." });
});
// you will need to create 3 endpoints here, and it should work magically :)
// note: for app.post: newNote.id = uuid.v4() // use a random unique id.
// ... code away ...

// Listener ==================================================
app.listen(PORT, function () {
  console.log(`Serving notes on PORT ${PORT}, http://localhost:${PORT}`);
});
