const sequelize = require('../db')

const {DataTypes} = require('sequelize');

const TokenDB = sequelize.define('tokens', {
    token: {type: DataTypes.CHAR},
    userID: {type: DataTypes.BIGINT},
    expirationDate: { type: DataTypes.DATE }
})

module.exports = TokenDB;