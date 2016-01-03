var mysql      = require('mysql2');

var host = '';
switch (process.env.NODE_ENV) {
    case 'development': host = '45.16.76.67'; break;
    case 'developmentLocal': host = '192.168.1.211'; break;
    default: host = 'localhost'; break;
}

var connectionPoolConfig = {
    host     : host,
    user     : 'dev',
    password : 'gayisok1',
    database : 'gsa_site',
    connectionLimit: 50
};

var adminConnectionPoolConfig = {
    host     : host,
    user     : 'dev',
    password : 'gayisok1',
    database : 'admin_gsa_site',
    connectionLimit: 50
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