var express = require('express')

var app = express();

app.use(express.static('static')); // express.static built-in middleware function in Express.
//Pass the name of the directory that contains the static assets to the 
//express.static middleware function to start serving the files directly.

var server = app.listen(3000, function() {
	var port = server.address().port;
	console.log("Started server at port", port);
});
