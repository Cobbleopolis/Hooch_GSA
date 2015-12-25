var mysql      = require('mysql');

var connectionPoolConfig = {
    host     : process.env.NODE_ENV === 'development' ? '45.16.76.67' : 'localhost',
    user     : 'dev',
    password : 'gayisok1',
    database : 'gsa_site',
    connectionLimit: 50
};

var connectionPool = mysql.createPool(connectionPoolConfig);

connectionPool.on('enqueue', function () {
    console.log('Waiting for available connection slot');
});

module.exports.getDBPool = connectionPool;

//module.exports = connection;