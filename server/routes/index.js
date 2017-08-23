var path = require('path');
var router = require('express').Router();

router.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '../../client/index.html'));
});

router.get('/about', function (req, res) {
	res.send('Got a POST request');
});

module.exports = router;
