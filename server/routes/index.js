var path = require('path');
var router = require('express').Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://localhost:27017/mydb';

router.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '../../client/index.html'));
});

router.get('/get-data', function (req, res) {
	mongo.connect(url, function(err, db) {
		if(err){
			return res.status(500).send("Couldn't connect to server")
		}

		var cursor = db.collection('user-data').find(
			{'time': {$gte: '2017-04-01T00:00:00.000Z', $lte: '2017-04-01T01:00:00.000Z'}}).toArray((err, docs) => {
			if(err){
				return res.status(500).send("Couldn't fetch documents")
			}

			res.send(JSON.stringify(docs));
		});


		db.close();
	});
});

module.exports = router;
