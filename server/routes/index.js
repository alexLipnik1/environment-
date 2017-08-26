var path = require('path');
var router = require('express').Router();
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');

var url = 'mongodb://localhost:27017/mydb';

router.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '../../client/index.html'));
});

router.get('/get-data', function (req, res, data) {
	mongo.connect(url, function(err, db) {
		if(err){
			return res.status(500).send("Couldn't connect to server")
		}

		const sel = {'time': {$gte: req.query.from, $lt: req.query.to}};
		console.log(sel)
		var cursor = db.collection('user-data').find(sel).toArray((err, docs) => {
			if(err){
				return res.status(500).send("Couldn't fetch documents")
			}
			
			console.log(req.query['1'])
			res.send(JSON.stringify(docs));
		});


		db.close();
	});
});

module.exports = router;
