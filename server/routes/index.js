var path = require('path');
var router = require('express').Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://localhost:27017/mydb';

router.get('/', function (req, res) {
	res.sendFile(path.resolve('../../client/index.html'));
});

router.get('/get-geo-data', function (req, res, data) {
	mongo.connect(url, function(err, db) {
		if(err){
			return res.status(500).send("Couldn't connect to server")
		}
		var data;
		var geoData;
		var tagData;

		const sel2 = { "time" : {$gte: "2017-04-01T00:25:58.954Z", $lt: "2017-04-02T01:20:58.954Z"}};
		const sel = {'time': {$gte: req.query.from, $lt: req.query.to}};
		var cursor1 = db.collection('geo').find(sel2).toArray((err, geos) => {
			if(err){
				return res.status(500).send("Couldn't fetch documents")
			}
			geoData = geos;
			db.close();
		});

		var cursor2 = db.collection('tags').find(sel2).toArray((err, tags) => {
			if(err){	
				return res.status(500).send("Couldn't fetch documents")
			}
			tagData = tags;
			res.send(JSON.stringify([tagData, geoData]));
		});

		db.close();
	});
});

module.exports = router;
