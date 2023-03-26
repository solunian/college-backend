import * as express from 'express';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as bodyParser from "body-parser";

const app = express();
const db = admin.firestore();
const userCollection = 'users';
const postCollection = 'posts';

/* USER ROUTES */
app.post('/users', async (req, res) => {
  try {
    const user = {
      name: req.body['name'],
      tags: req.body['tags'],
      majors: req.body['majors']
    }

    const newUser = await db.collection(userCollection).add(user);
    res.status(201).send(`Created a new user: ${newUser.id}`);
  } catch (error) {
    res.status(404).send(`Name, tag, or majors for new user were invalid.`)
  }
})

app.get('/users', async (req, res) => {
  try {
    const snapshot = await db.collection(userCollection).get();
    const users = [];

    snapshot.map((user) => {
      users.push({
        id: user.id,
        data: user.data()
      })
    })

  }
})