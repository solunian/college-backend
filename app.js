const express = require('express');
const controller = require('./controller.js');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

/* DEV TEST */
app.get("/test", (req, res) => {
	console.log("'/test' API called");
	return res.status(201).json({hi: "cornell university"});
});


/* POST ROUTES */
app.get('/posts/:name', async (req, res) => {
	const name = req.params.name;
	
	if (typeof name !== 'string') return res.status(400).json({});
	console.log(`'/posts' API get request. Name: ${name}`);
	
	const posts = await controller.getPosts(name);
	console.log("returned posts: ", posts);

	return res.status(201).json(posts);
});

app.post('/post', (req, res) => {

	if (typeof req.body.title  !== 'string') return res.status(400).json({});
	if (typeof req.body.author !== 'string') return res.status(400).json({});
	if (typeof req.body.text   !== 'string') return res.status(400).json({});
	if (typeof req.body.major  !== 'string') return res.status(400).json({});
	if (typeof req.body.attachments  !== 'string') return res.status(400).json({});
	
	const post = {
		title: req.body.title,
		author: req.body.author,
		text: req.body.text,
		major: req.body.major,
		attachments: req.body.attachments,
		tags: req.body.tags ? req.body.tags : [],
	}	
	console.log(`'/post' API post request.\nPost:`, post);
	controller.putPost(post);
	return res.status(201).json({"msg": "done"});
});


app.get("/user/:name", async (req, res) => {
    console.log("'GET /user:name' called");
    const user = await controller.getUserByName(req.params.name);
    return res.status(200).json(user);
})

app.post("/user", async (req, res) => {
    console.log("'POST /user called");
    const user = req.body;
    if (user == undefined) return;

    await controller.addUser(user);
    res.status(200).json();
})

app.get("/users", async (req, res) => {
    controller.getUsers();
})

app.post("/user/:name/:tag", async (req, res) => {
    console.log('POST /user/:tag/:name called');
    const tag = req.params.tag;
    const name = req.params.name;
    if (tag === undefined || name === undefined) return;

    await controller.addTag(name, tag);
    res.status(200).json(tag);
})

app.delete("/user/:name/:tag", async (req, res) => {
    console.log('DELETE /user/:name/:tag called');
    const tag = req.params.tag;
    const name = req.params.name;
    if (tag === undefined || name === undefined) return;

    await controller.removeTag(name, tag);
    res.status(200).json(tag);
});


/* Start */ 
app.listen(2023, () => {
    console.log("listening on port: ", 2023);
});
