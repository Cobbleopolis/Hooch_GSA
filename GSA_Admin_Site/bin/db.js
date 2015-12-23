var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : process.env.NODE_ENV === 'development' ? '45.16.76.67' : 'localhost',
    user     : 'dev',
    password : 'gayisok1',
    database : 'gsa_site'
});

module.exports = connection;