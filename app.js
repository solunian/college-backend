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
	console.log(req.body);

	const post = {
		title: req.body.title,
		author: req.body.author,
		text: req.body.text,
		major: req.body.major,
		attachments: req.body.attachments,
		tags: req.body.tags.split(','),
	}
	console.log(`'/post' API post request.\nPost:`, post);
	controller.putPost(post);
	return res.status(201).json({"msg": "done"});
});

app.get('/search/:tag', async (req, res) => {
	const result = await controller.filterByTag(req.params.tag);
	return res.status(200).json(result);
});


app.get("/user/:name", async (req, res) => {
    console.log("'GET /user:name' called");
    const user = await controller.getUserByName(req.params.name);

	if (user === undefined) return res.status(400). json({err: "none"});

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

app.post("/user/edit/:name", async (req, res) => {
	if (typeof req.body.name   !== 'string') return res.status(400).json({});
	if (typeof req.body.bio    !== 'string') return res.status(400).json({});
	if (typeof req.body.majors !== 'string') return res.status(400).json({});

	console.log('POST /user/edit/:name called');

	const user = {
		name: req.body.name,
		tags: req.body.tags,
		majors: req.body.majors.split(','),
		bio: req.body.bio,
	}

    await controller.updateUser(user);
    res.status(200).json(user);

});


/* Start */
app.listen(2023, () => {
    console.log("listening on port: ", 2023);
});
