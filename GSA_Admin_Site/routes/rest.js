var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var adminDB = require('../bin/db').getAdminDB;
var bcrypt = require('bcryptjs');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.post('/addUser', function(req, res, next) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            req.body.password = hash;
            adminDB.query('insert into users set ?', req.body, function(err, result) {
                if (err)
                    res.send("Something Went Wrong");
                else
                    res.send("Added");
            });
        });
    });
});


app.post('/login', function(req, res, next) {
    adminDB.query('select username, password from users where username = ?', req.body.username, function (err, row, fields) {
        var user = row[0];
        if (user === null) {
            res.send('User/pass incorrect');
            return;
        }
        bcrypt.compare(req.body.password, user.password, function(err, compare) {
            if (err)
                res.send('Something went wrong');
            else if (compare)
                res.send('Login successful');
            else
                res.send('User/pass incorrect');
        });
    });
});

module.exports = app;
