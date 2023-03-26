const express = require('express');
const controller = require('./controller.js');

const app = express();
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


/* Start */ 
app.listen(2023, () => {
    console.log("listening on port: ", 2023);
});
