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

module.exports = {
	test: test,
	getPosts: getPosts,
	putPost: putPost,
}
