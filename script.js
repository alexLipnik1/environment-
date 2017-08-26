fs = require('fs')
var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;

	var arr = [];
	var str = "";
	var cnt = 0;

	function process(o){
		db.collection(o.type).insertOne(o, function(err, res) {
			if (err) throw err;
		});
	}

	fs.readFile('reports.log', 'utf8', function (err,data) {
		if (err) {
			return console.log(err);
		}
		for(var i=0; i<data.length; i++){
			str += data.charAt(i);
			if(data.charAt(i)==='{')
				cnt++;
			if(data.charAt(i)==='}') {
				cnt--;
				if(cnt === 0){
					let o = JSON.parse(str);
					process(o);
					str = '';
				}
			}
		}
	});
});