//https://tediousjs.github.io/node-mssql/
//npm install mssql

const sqlConnectionString = {
    user: 'sa',
    password: '12345',
    server: 'localhost', 
    database: 'KAS',
    "options": {
        "encrypt": true,
        "enableArithAbort": true
        },
};

module.exports.sqlConnectionString = sqlConnectionString