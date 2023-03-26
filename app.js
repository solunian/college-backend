const express = require('express');
const controller = require('./controller.js');
require("dotenv").config("./.env");

const app = express();
<<<<<<< Updated upstream
app.use(express.json());

/* DEV TEST */
app.get("/test", (req, res) => {
	console.log("'/test' API called");
	controller.test();
});


/* POST ROUTES */
app.get('/posts', async (req, res) => {
	const name = req.body.name;
	const tags = req.body.tags;
	const majors = req.body.majors;

	console.log(`'/posts' API get request. Name: ${name}, Tags: ${tags}, Majors: ${majors}`);

	const posts = await controller.getPosts(name, tags, majors);
	console.log(posts);

	return res.status(201).json(posts);
});

app.post('/post', (req, res) => {
	const post = {
		title: req.body.title,
		text: req.body.text,
		tags: req.body.tags,
		majors: req.body.majors
	}	
	console.log(`'/post' API post request.\nPost:`, post);
	if (typeof post.title !== 'string') return res.status(400);
	if (typeof post.text !== 'string') return res.status(400);

	controller.putPost(post);
});
=======
const port = process.env.port;
>>>>>>> Stashed changes

app.get("/test", (req, res) => {
	console.log("'/test' API called");
	controller.test();
});

<<<<<<< Updated upstream
app.get("/user/:email", async (req, res) => {
    console.log("'GET /user:email' called");
    const user = await controller.getUserByEmail(req.params.email);
    return res.status(200).json(user);
=======
app.get("/user/:email", (req, res) => {
    console.log("'GET /user:email' called");
    controller.getUserByEmail(req.params.email);
>>>>>>> Stashed changes
})

app.post("/user", async (req, res) => {
    console.log("'POST /user called");
    const user = req.body.user;
    if (user == undefined) return;

    await controller.addUser(user);
    res.status(200).json();
})

<<<<<<< Updated upstream
app.get("/users", (req, res) => {
    controller.getUsers();
})

/* Start */ 
app.listen(2023, () => {
    console.log("listening on port: ", 2023);
=======
app.listen(port, () => {
    console.log("listening on port: ", port);
>>>>>>> Stashed changes
});
