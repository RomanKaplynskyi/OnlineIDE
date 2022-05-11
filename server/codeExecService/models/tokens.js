const sequelize = require('../db')

const {DataTypes} = require('sequelize');

const TokenDB = sequelize.define('tokens', {
    token: {type: DataTypes.CHAR},
    userID: {type: DataTypes.BIGINT},
})

module.exports = TokenDB;