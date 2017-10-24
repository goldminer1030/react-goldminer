var express = require('express');
var router = express.Router();
var data = require('./data/nfl');

router.get('/', function (req, res) {
    res.json(data);
});

router.get('/:conf', function (req, res) {
    res.json(data[req.params.conf.toUpperCase()]);
});

router.get('/:conf/:div', function (req, res) {
    var division = req.params.div.charAt(0).toUpperCase() + req.params.div.slice(1),
        conference = req.params.conf.toUpperCase();
    res.json(data[conference][division]);
});

router.post('/', function (req, res) {

    var err = null;

    if (!req.body.conference) {
        err = new Error("A conference was supplied");
    } else if (!req.body.division) {
        err = new Error("A division was not supplied");
    } else if (!req.body.city) {
        err = new Error("A city was not supplied");
    } else if (!req.body.team) {
        err = new Error("A team was not supplied");
    }

    if (err) {
        res.status(500);
        res.json(err);
    } else {
        var division = req.body.division.charAt(0).toUpperCase() + req.body.division.slice(1),
            conference = req.body.conference.toUpperCase(),
            city = req.body.city.charAt(0).toUpperCase() + req.body.city.slice(1),
            team = req.body.team.charAt(0).toUpperCase() + req.body.team.slice(1);

        data[conference][division].push(city + ' ' + team);

        res.status(200);
        res.json({
            status: 'success',
            message: 'team added: ' + city + ' ' + team,
            conference: conference,
            division: division
        });
    }


});

module.exports = router;
