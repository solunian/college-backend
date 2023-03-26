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

module.exports = {
	test: test,
}
