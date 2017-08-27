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

		var geoData;
		var tagData;

		const sel = {'time': {$gte: new Date(req.query.from), $lt: new Date(req.query.to)}};
		var cursor1 = db.collection('geo').find(sel).toArray((err, geos) => {
			if(err){
				return res.status(500).send("Couldn't fetch documents")
			}
			geoData = geos;
			// db.close();
		});

		var cursor2 = db.collection('tag').find(sel).toArray((err, tags) => {
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
