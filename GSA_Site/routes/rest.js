var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require('../bin/db');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

module.exports = app;
