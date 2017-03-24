var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(express.static('static')); // express.static built-in middleware function in Express.
//Pass the name of the directory that contains the static assets to the 
//express.static middleware function to start serving the files directly.

//Create an initial array of bugs in the web server

var bugData = [
	{id: 1, priority: 'P1', status: 'Open', owner: 'Ravan', title:'App crashes on open'},
	{id: 2, priority: 'P2', status: 'New', owner: 'Eddie', title:'Misaligned border on panel'}
];

// in the web server, create an endpoint /api/bugs
app.get('/api/bugs', function(req,res){
	//stringify and return the array of bugs in this endpoint
	//res.status(200).send(JSON.stringify(bugData));
	res.json(bugData);
});

app.use(bodyParser.json());
app.post('/api/bugs/', function(req, res) {
	console.log("Req body:", req.body);
	var newBug = req.body;
	newBug.id = bugData.length + 1;
	bugData.push(newBug);
	res.json(newBug);
});

var server = app.listen(3000, function() {
	var port = server.address().port;
	console.log("Started server at port", port);
});
