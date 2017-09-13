var path = require('path');
var router = require('express').Router();
var assert = require('assert');

router.get('/', function (req, res) {
	res.sendFile(path.resolve('../../client/index.html'));
});

module.exports = router;
