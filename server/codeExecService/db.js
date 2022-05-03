const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    'onlineideulogdb',
    'postgres',
    'admin',
    {
        host: 'localhost',
        port: 5432,
        dialect: 'postgres'
    }

)