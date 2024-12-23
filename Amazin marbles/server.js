const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database setup
const db = new sqlite3.Database('./quotes.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    db.run(
      `CREATE TABLE IF NOT EXISTS quotes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        product TEXT NOT NULL,
        message TEXT
      )`,
      (err) => {
        if (err) {
          console.error('Error creating table:', err.message);
        }
      }
    );
  }
});

// Serve static files (HTML/CSS/JS)
app.use(express.static('public'));

// Route to handle form submission
// Route to handle form submission
app.post('/request-quote', (req, res) => {
    const { name, email, product, message } = req.body;
    const query = INSERT INTO quotes (name, email, product, message) VALUES (?, ?, ?, ?);
  
    db.run(query, [name, email, product, message], (err) => {
      if (err) {
        console.error('Error saving quote:', err);
        res.status(500).send('Error saving quote.');
      } else {
        res.send('Quote request submitted successfully.');
      }
    }); // Correctly close db.run block here
  });

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
