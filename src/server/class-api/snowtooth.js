var express = require('express');
var router = express.Router();
var liftData = require('./data/snowtooth-lifts');
var trailData = require('./data/snowtooth-trails');

router.get('/lifts', function (req, res) {
    res.json(liftData);
});

router.get('/lifts/status/:status', function (req, res) {
    res.json(liftData.filter(function (lift) {
        return lift.status === req.params.status.toLowerCase();
    }));
});

router.get('/lifts/:name', function (req, res) {
    var searchString = req.params.name.replace(/-/g, ' ');
    res.json(liftData.filter(function (lift) {
        var str = lift.name.slice(0, searchString.length).toLowerCase();
        return str === searchString.toLowerCase();
    }));
});

router.put('/lifts/:name', function (req, res) {
    var liftName = req.params.name.replace(/-/g, ' ').toLowerCase(),
        oldStatus;

    console.log('put request', liftName, req.body.status)

    liftData = liftData.map(function(lift) {
        if (lift.name.toLowerCase() === liftName) {
            oldStatus = lift.status;
            lift.status = req.body.status.toLowerCase();
            res.json({
                "name": lift.name,
                "oldStatus": oldStatus,
                "status": lift.status
            });
        }
        return lift;
    });
});


router.get('/trails', function(req, res) {
    res.json(trailData);
});


router.get('/trails/:name', function (req, res) {
    var searchString = req.params.name.replace(/-/g, ' ');
    res.json(trailData.filter(function (trail) {
        var str = trail.name.slice(0, searchString.length).toLowerCase();
        return str === searchString.toLowerCase();
    })[0]);
});

router.put('/trails/:name', function (req, res) {
    var trailName = req.params.name.replace(/-/g, ' ').toLowerCase(),
        oldStatus;
    trailData = trailData.map(function(trail) {
        if (trail.name.toLowerCase() === trailName) {
            oldStatus = trail.status;
            trail.status = req.body.status.toLowerCase();
            res.json({
                "name": trail.name,
                "oldStatus": oldStatus,
                "status": trail.status
            });
        }
        return trail;
    });
});

router.get('/trails/status/:status', function(req, res) {
    res.json(trailData.filter(function(trail) {
        return trail.status.toLowerCase() === req.params.status.toLowerCase();
    }));
});

router.get('/trails/lift/:name', function(req, res) {
    res.json(trailData.filter(function(trail) {
        return trail.lift.toLowerCase() === req.params.name.replace(/-/g, ' ').toLowerCase();
    })[0]);
});

router.get('/trails/difficulty/:difficulty', function(req, res) {
    const skiLevel = new RegExp(req.params.difficulty.replace(/,/g, '|'))
    res.json(trailData.filter(function(trail) {
        return trail.difficulty.toLowerCase().match(skiLevel);
    }));
});

module.exports = router;
