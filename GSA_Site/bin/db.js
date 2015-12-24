var mysql      = require('mysql');
var profile = {
    host     : process.env.NODE_ENV === 'development' ? '45.16.76.67' : 'localhost',
    user     : 'gsa-site',
    password : 'gayisok1',
    database : 'gsa_site'
};
var connection = mysql.createConnection(profile);

console.log(profile);
module.exports.getDB = connection;

//module.exports = connection;