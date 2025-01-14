const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());  // Allow frontend (React) to communicate with backend

// Connect to SQLite database
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Create a table if it doesn't exist
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS plan (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      budget TEXT,
      user_id INTEGER,
      date TEXT,

      destination TEXT,
      departure TEXT
    );
  `);
});

// Endpoint to save a plan
app.post('/api/save-plan', (req, res) => {
  const {budget ,date, destination } = req.body;

  const stmt = db.prepare("INSERT INTO plan (  budget, date,destination,departure) VALUES (?, ?, ?, ?)");
  stmt.run(user_id,budget ,date,  destination, departure,function(err) {
    if (err) {
      console.error('Error saving data:', err.message);
      res.status(500).send('Failed to save the plan.');
    } else {
      res.json({ success: true, planId: this.lastID });
    }
  });
});

// Endpoint to fetch all plans
app.get('/api/get-plans', (req, res) => {
  db.all("SELECT * FROM plan", [], (err, rows) => {
    if (err) {
      console.error('Error fetching data:', err.message);
      res.status(500).send('Failed to fetch plans.');
    } else {
      res.json(rows);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
