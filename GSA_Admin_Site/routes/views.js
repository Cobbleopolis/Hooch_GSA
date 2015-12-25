var express = require('express');
var router = express.Router();
var db = require('../bin/db');

var nav = [
    {
        text: 'Home',
        icon: 'home',
        link: '/'
    },
    {
        text: 'Flags',
        icon: 'flag',
        link: '/flags'
    }
];

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express', nav: nav});
});

router.get('/login', function (req, res, next) {
    res.render('login', {title: 'Express'});
});

module.exports = router;
