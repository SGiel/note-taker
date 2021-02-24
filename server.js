const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const fs = require('fs');
const path = require('path');

const express = require('express');

const notes  = require('./db/db.json');

const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.use(express.static('public'));

// Routes
// ===========================================================
app.get('/', (req, res) => {
    res.send('Welcome to the Note Taker!');
  });
  
  // Create a GET route `/api/characters` that returns all of the characters
  //
  app.get('/notes', (req,res) => {
    res.json(notes);
  })

app.listen(PORT, () => {
    console.log(`API server now on port http://localhost:${PORT}`);
});