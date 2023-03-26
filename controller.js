var firebase = require("./firebase.js");

var db = firebase.database();
var usersRef = db.ref('users');
var postsRef = db.ref('posts');

async function test () {
	const user = {
		when: "he",
		at: "123041"
	};
	usersRef.push(user);
}

<<<<<<< Updated upstream
function getPosts (name, tags, majors) {
	const AMOUNT = 5;

	return postsRef.limitToLast(AMOUNT).once("value")
		.then(snapshot => {
			const posts = snapshot.val();
			console.log("posts at 'getPosts'", posts);
			return posts;
		}).catch(e => {
			console.log(e);
			console.error("Error on 'getPosts'", e);
		})
		
}

async function putPost (post) {
	postsRef.push(post);
}

async function getUsers() {
	return usersRef.limitToLast(1).once("value")
	.then(snapshot => {
		const posts = snapshot.val();
		console.log("users at 'getUsers'", posts);
		return posts;
	}).catch(e => {
		console.log(e);
		console.error("Error on 'getUsers'", e);
	})
}

=======
>>>>>>> Stashed changes
/* USER ROUTES */

//Get user by email - params (email)
async function getUserByEmail(email) {
<<<<<<< Updated upstream
	console.log(email);
=======
>>>>>>> Stashed changes
	return (
		usersRef.orderByChild('email').equalTo(email).limitToLast(1).once("value")
		.then ((snapshot) => {
			const val = snapshot.val();
			const id = Object.keys(val)[0];

			return val[id];
		}).catch((err) => {
			return undefined;
		})
	)
}

async function validateUser(user) {
	return undefined;
}


async function addUser(user) {
	console.log(user);
	let err = await validateUser(user);

	if (err == undefined) {
		let newUser = {
			name: user.name,
			tags: user.tags,
			majors: user.majors,
			email: user.email
		};

		if (!newUser.email || !newUser.name) {
			return;
		}

		usersRef.push(newUser);
	} else {
		console.log("Invalid user.");
		return err;
	}
}

async function addTag(email, tag) {
	await usersRef.orderByChild('email').equalTo(email).limitToLast(1).once("value", snapshot => {
		const val = snapshot.val();
		const id = Object.keys(val)[0];
		if (val[id].tags == undefined) val[id].tags = [];
		val[id].tags.push(tag);
		snapshot.ref.update(val);
		console.log(`${tag} added to ${email}`);
	});
}

async function removeTag(email, tag) {
	await usersRef.orderByChild('email').equalTo(email).limitToLast(1).once("value", snapshot => {
		const val = snapshot.val();
		const id = Object.keys(val)[0];
		if (val[id].tags == undefined) val[id].tags = [];
		val[id].tags = _.remove(val[id].tags, function(n) { return n !== tag;});
		console.log(`${tag} removed from ${email}`);
	})
}

module.exports = {
	test: test,
	getUserByEmail: getUserByEmail, 
	addUser: addUser,
	addTag: addTag,
<<<<<<< Updated upstream
	removeTag: removeTag,
	getPosts: getPosts,
	putPost: putPost,
	getUsers: getUsers
}
=======
	removeTag: removeTag
}
>>>>>>> Stashed changes
