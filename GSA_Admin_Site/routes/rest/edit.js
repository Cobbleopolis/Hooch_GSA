var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var db = require('../../bin/db');
var async = require('async');

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.get('/homeEditSelectors', function(req, res, next){
    db.getDBPool.getConnection(function (err, connection) {
        if (err) {
            res.status(500).send('Internal Server Error');
            throw err;
        }
        var dbOut = {
            rows: [],
            sections: []
        };
        connection.query("select distinct section from homePage order by section asc;", function(err, rows, fields) {
            if (err) {
                res.status(500).send('Internal Server Error');
                throw err;
            }
            for (var i in rows)
                dbOut.rows.push(rows[i].section);
            connection.prepare("select * from homePage where section = ?", function(err, statement) {
                async.map(dbOut.rows, function(value, callback) {
                    statement.execute([value], function (err, sections, fields) {
                        var out = [];
                        for (var j in sections)
                            out.push(sections[j].header);
                        callback (err, out);
                    });
                }, function(err, result) {
                    if (err) {
                        res.status(500).send('Internal Server Error');
                        connection.release();
                        throw err;
                    }
                    dbOut.sections = result;
                    res.send(dbOut);
                });
                statement.close();
            });
            connection.release();

        });

    });
});

module.exports = app;