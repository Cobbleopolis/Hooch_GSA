var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('../database/gsaSite.db');

//exports.getDB = db;
//
//exports.serialize = function(serialFunction) {
//    db.serialize(serialFunction(db));
//};
//
//exports.close = function() {
//    db.close();
//};

module.exports = db;