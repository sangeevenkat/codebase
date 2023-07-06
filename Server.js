const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// MySQL database connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  database: 'skworldsearch',
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed: ', err);
    return;
  }
  console.log('Connected to the database');
});

// Register endpoint
app.post('/register', (req, res) => {
  const { user,fullname,email,phonenumber,password ,termcondition } = req.body;

  // Insert the user into the database
  const query = 'INSERT INTO propregistration (user,fullname,email,phonenumber,password ,termcondition) VALUES (?, ?,?,?,?,?)';
  db.query(query, [user,fullname,email,phonenumber,password ,termcondition], (err, result) => {
    if (err) {
      console.error('Error registering user: ', err);
      res.status(500).json({ message: 'Registration failed' });
      return;
    }
    res.status(200).json({ message: 'Registration successful' });
  });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists in the database
  const query = 'SELECT * FROM propregistration WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, result) => {
    if (err) {
      console.error('Error logging in: ', err);
      res.status(500).json({ message: 'Login failed' });
      return;
    }

    if (result.length === 0) {
      res.status(401).json({ message: 'Invalid username or password' });
    } else {
      res.status(200).json({ message: 'Login successful' });
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
