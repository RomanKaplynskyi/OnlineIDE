const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    'onlineideulogdb',
    'postgres',
    'Windows1',
    {
        host: 'localhost',
        port: 5432,
        dialect: 'postgres'
    }

)