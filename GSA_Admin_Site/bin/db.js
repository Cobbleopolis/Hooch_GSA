var mysql      = require('mysql');

var connectionPoolConfig = {
    host     : process.env.NODE_ENV === 'development' ? '45.16.76.67' : 'localhost',
    user     : 'dev',
    password : 'gayisok1',
    database : 'gsa_site',
    connectionLimit: 50
};

var adminConnectionPoolConfig = {
    host     : process.env.NODE_ENV === 'development' ? '45.16.76.67' : 'localhost',
    user     : 'dev',
    password : 'gayisok1',
    database : 'admin_gsa_site',
    connectionLimit: 2
};

var connectionPool = mysql.createPool(connectionPoolConfig);

var adminConnectionPool = mysql.createPool(adminConnectionPoolConfig);

connectionPool.on('enqueue', function () {
    console.log('Waiting for available connection slot');
});

adminConnectionPool.on('enqueue', function () {
    console.log('Waiting for available admin connection slot');
});


module.exports.getDBPool = connectionPool;
module.exports.getAdminDBPool = adminConnectionPool;

//module.exports = connection;