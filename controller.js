var firebase = require("./firebase.js");

var db = firebase.database();
var usersRef = db.ref('users');
var postsRef = db.ref('posts');

async function getUser (name) {
	return usersRef.orderByChild("name").equalTo(name).once("value")
		.then(snapshot => {
			const val = snapshot.val();
			const userID = Object.keys(val)[0];

			return val[userID];
		})
		.catch(e => console.error)
}

async function getPosts (name) {
	const majors = (await getUser(name)).majors;
	console.log(`majors for user '${name}': `, majors);

	let posts = [];
	for (let i=0; i<majors.length; i++) {
		const major = majors[i];
		const list = await postsRef.orderByChild("major").equalTo(major).once("value")
			.then( snapshot => snapshot.val() )
			.catch(e => [])
		console.log(`fetched posts for major '${major}': `, list);
		for (post in list)
			posts.push(list[post]);
	};
	return posts;
}

async function putPost (post) {
	postsRef.push(post);
}


/* USER ROUTES */
async function getUsers() {
	return usersRef.once("value")
	.then(snapshot => {
		const posts = snapshot.val();
		//console.log("users at 'getUsers'", posts);
		return posts;
	}).catch(e => {
		console.log(e);
		console.error("Error on 'getUsers'", e);
	})
}

//Get user by name - params (name)
async function getUserByName(name) {
	//console.log(email);
	return (
		usersRef.orderByChild('name').equalTo(name).limitToLast(1).once("value")
		.then ((snapshot) => {
			const val = snapshot.val();
			const id = Object.keys(val)[0];

			return val[id];
		}).catch((err) => {
			return undefined;
		})
	)
}

async function validateEmail(user) {
	let userInfo = {
		name: user.name,
		tags: user.tags,
		major: user.majors,
		email: user.email
	}
	var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

	if (userInfo.email.match(validRegex)) {
		console.log("Valid email address!");
		return undefined;
	} else {
		console.log("Invalid email address!");
		return -1;
	}

}

async function validateUser(user) {
	let users = await getUsers();
	let condition = true;
	console.log(typeof users);
	Object.entries(users).forEach((entry) => {
		const [key, value] = entry;
		console.log(value.email + " " + user.email + "\n" + value.name + " " + user.name);
		console.log((value.email === user.email) + " " + (value.name === user.name))
		if (value.email === user.email || value.name === user.name) {
			console.log("hehrse");
			condition = false;
		}
	});

	if (condition == false) return -1;
	return undefined;
}

async function addUser(user) {
	let emailErr = await validateEmail(user);
	//let userErr = await validateUser(user);
	console.log(emailErr + " ");
	if (emailErr === undefined) {
		let newUser = {
			name: user.name,
			tags: user.tags,
			majors: user.majors,
			email: user.email,
			bio: user.bio
		};

		if (!newUser.email || !newUser.name) {
			return;
		}

		usersRef.push(newUser);
	} else {
		console.log("Invalid user.");
		return emailErr;
	}
}


async function updateUser (user) {
	await usersRef.orderByChild('name').equalTo(user.name).limitToLast(1).once("value", snapshot => {
		const val = snapshot.val();
		const id = Object.keys(val)[0];

		val[id] = user;
	 	snapshot.ref.update(val);
		console.log(`User '${user.name}, updated to: `, user);
	});
}

async function removeTag(name, tag) {
	await usersRef.orderByChild('name').equalTo(name).limitToLast(1).once("value", snapshot => {
		const val = snapshot.val();
		const id = Object.keys(val)[0];
		if (val[id].tags == undefined) val[id].tags = [];
		val[id].tags = val[id].tags.filter(function(ele){
            return ele != tag;
        });

		console.log(val[id].tags);
		snapshot.ref.update(val);
		console.log(`${tag} removed from ${name}`);
	})
}

async function getAllPosts() {
	return postsRef.once("value")
	.then(snapshot => {
		const posts = snapshot.val();
		//console.log("users at 'getUsers'", posts);
		return posts;
	}).catch(e => {
		console.log(e);
		console.error("Error on 'getUsers'", e);
	})
}

async function filterTag(tag) {
	let posts = await getAllPosts();
	let results = [];
	Object.entries(posts).forEach(async (entry) => {
		const [key, value] = entry;
		if (value.tags.includes(tag)) {
			results.push(value);
		}
	});

	return results;
}

module.exports = {
	getUserByName: getUserByName,
	addUser: addUser,
	updateUser: updateUser,
	getPosts: getPosts,
	putPost: putPost,
	getUsers: getUsers,
	filterByTag: filterTag
}
