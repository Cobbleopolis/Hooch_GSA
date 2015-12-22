var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require('../bin/db');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.post('/insert', function(req, res, next) {
    var stmt = db.prepare("insert into lorem values (?)");
    console.log(req);
    stmt.run(req.body.text);
    stmt.finalize();
    res.send("Added");
});


module.exports = app;
