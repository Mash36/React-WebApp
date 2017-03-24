var express = require('express');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

var app = express();
var db;

app.use(express.static('static')); // express.static built-in middleware function in Express.
//Pass the name of the directory that contains the static assets to the 
//express.static middleware function to start serving the files directly.

// in the web server, create an endpoint /api/bugs
app.get('/api/bugs', function(req,res){
	db.collection("bugs").find().toArray(function(err,docs){
		res.json(docs);
		//Modifing the GET API to query the data from the DB
		//using find() and converting it to an array.
	});
});

app.use(bodyParser.json());
app.post('/api/bugs/', function(req, res) {
	console.log("Req body:", req.body);
	var newBug = req.body;
	
	db.collection("bugs").insertOne(newBug, function(err, result){
		var newId = result.insertedId;
		db.collection("bugs").find({_id:newId}).next(function(err,doc){
			res.json(doc);
		});
	});
});

MongoClient.connect('mongodb://localhost/bugsdb', function(err, dbConnection){
	db = dbConnection;
	var server = app.listen(3000, function() {
		var port = server.address().port;
		console.log("Started server at port", port);
	});
})