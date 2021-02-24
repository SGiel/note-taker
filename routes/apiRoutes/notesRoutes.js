const router = require('express').Router();

const {notes} = require('../../db/db.json');

const fs = require("fs");
const path = require("path");

function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;

    if (query.title) {
      filteredResults = filteredResults.filter(note => note.title === query.title);
    }
    // return the filtered results:
    return filteredResults;
}

function findById(id, notesArray) {
    const result = notesArray.filter(note => note.id == id)[0];
    return result;
}

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
      path.join(__dirname, '../../db/db.json'),
      JSON.stringify({ notes: notesArray }, null, 2)
    );
    return note;
}

function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
      return false;
    }
    return true;
}

router.get('/notes', (req, res) => {
  let results = notes;
  if (req.query) {
    results = filterByQuery(req.query, results);
  }
  res.json(results);
});

router.get('/notes/:id', (req, res) => {
  const result = findById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.status(404).send('The id does not exist in the notes');
  }
});

router.post('/notes', (req, res) => {
  // set id based on what the next index of the array will be
  
  req.body.id = notes.length.toString();

  if (!validateNote(req.body)) {
    res.status(400).send('The animal is not properly formatted.');
  } else {
    const note = createNewNote(req.body, notes);
    res.json(note);
  }
});

module.exports  = router;