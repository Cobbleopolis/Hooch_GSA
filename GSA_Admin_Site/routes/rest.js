var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var adminDB = require('../bin/db').getAdminDB;
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

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
                    res.status(401).send("Something Went Wrong");
                else
                    res.status(200).send("Added");
            });
        });
    });
});


app.post('/login', function(req, res, next) {
    adminDB.query('select username, password from users where username = ?', req.body.username, function (err, row, fields) {
        if (err)
            throw err;
        var user = row[0];
        if (user === undefined) {
            res.status(401).send('User/pass incorrect');
            return;
        }
        bcrypt.compare(req.body.password, user.password, function(err, compare) {
            if (err)
                throw err;
                //res.status(401).send('Something went wrong');
            else if (compare) {
                jwt.sign({user: user.username}, 'testing', {expiresIn : 60000}, function (token) {
                    //res.writeHead({
                    //    'Set-Cookie': 'hoochGSAAdminLogin=' + token
                    //});
                    res.cookie('hoochGSAAdminLogin', token, {httpOnly: true}).status(200).send();
                });
            } else
                res.status(401).send('User/pass incorrect');
        });
    });
});

app.get('/logout', function(req, res, next) {
    res.clearCookie('hoochGSAAdminLogin').redirect('/login')
});

module.exports = app;
