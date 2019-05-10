var express = require('express');
var router = express.Router();

/* index */
router.get('/', function(req, res, next) {
	res.send('iss api index');
});

module.exports = router;