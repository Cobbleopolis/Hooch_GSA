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
        text: 'Edit Pages',
        icon: 'pencil-square-o',
        link: '/edit'
    }
];

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'GSA Admin Page', banner: "Admin Dashboard", nav: nav});
});

router.get('/edit', function (req, res, next) {
    res.render('edit', {title: 'GSA Admin Page', banner: "Edit Pages", nav: nav});
});

router.get('/login', function (req, res, next) {
    res.render('login', {title: 'Express'});
});

module.exports = router;
