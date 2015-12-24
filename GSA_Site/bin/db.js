var mysql      = require('mysql');
var profile = {
    host     : process.env.NODE_ENV === 'development' ? '45.16.76.67' : 'localhost',
    user     : 'dev',
    password : 'gayisok1',
    database : 'gsa_site'
};
var connection = mysql.createConnection(profile);

module.exports.getDB = connection;

//module.exports = connection;