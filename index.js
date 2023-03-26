const express = require('express');
require('dotenv').config("/.env");
const db = require('./db.js');
const profRef = db.ref('profiles');
const postsRef = db.ref('posts');
const port = process.env.port;

const app = express();

app.get("/", (req, res) => {
  res.send('herehehehehaw');
})

const userRef = db.ref('users');
/* USER ROUTES */

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
})