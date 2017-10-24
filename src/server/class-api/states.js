var express = require('express');
var router = express.Router();
var data = require('./data/states');

var allStates = [];

Object.keys(data).forEach(function (region) {
    Object.keys(data[region]).forEach(function (state) {
        allStates.push(data[region][state].toLowerCase());
    });
});

allStates.sort();

router.get('/', function (req, res) {
    res.json(data)
});

router.get('/region/:region', function (req, res) {
    res.json(data[req.params.region]);
});

router.get('/:search', function (req, res) {
    var filterdList =
    res.json(allStates.filter(function (state) {
        var str = state.slice(0, req.params.search.length);
        return (str === req.params.search.toLowerCase()) ? state : null;
    }));
});

module.exports = router;
