const express = require('express');
const controller = require('./controller.js');

const app = express();

app.get("/test", (req, res) => {
	console.log("'/test' API called");
	controller.test();
});

app.listen(2023, () => {
    console.log("listening on port: ", 2023);
});
