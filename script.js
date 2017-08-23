fs = require('fs')
var http = require('http');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.createCollection("user-data", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});

var arr = [];
var str = "";
var cnt = 0;

// function makeTimeObj(val) {
// 	var date = '';
// 	var time = '';
// 	for( var i=0; i<val.length ; i++){
// 		if(i<10)
// 			date += val[i];
// 		if(i>10)
// 			time += val[i];
// 	}
// 	var obj = {
// 		date: date,
// 		time: time,
// 	}
// 	return obj;
// }

function process(o){
	MongoClient.connect(url, function(err, db) {
	  if (err) throw err;
	  console.log(o);
	  db.collection("user-data").insertOne(o, function(err, res) {
	    if (err) throw err;
	    db.close();
	  });
	});
}

fs.readFile('file.log', 'utf8', function (err,data) {
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
				// Object.keys(o).map(function(key){
				// 	if(key === 'time'){
				// 		return o[key] = makeTimeObj(o[key]);
				// 	}
				// });
				process(o);
				str = '';
			}
		}
	}
});
