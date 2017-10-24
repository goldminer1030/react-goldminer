var express = require('express');
var router = express.Router();

var ResortsModel = require('./models/resorts');
var model = new ResortsModel();

router.get('/', function (req, res) {
    res.json(model.listAllNames());
});

router.get('/:search', function (req, res) {
    if (req.params.search.trim()) {
        model.listNames(req.params.search, function (filteredList) {
            res.json(filteredList);
        });
    }
});

module.exports = router;
