const sequelize = require('../db')

const {DataTypes} = require('sequelize');

const UserEmail = sequelize.define('emails', {
    eMail: {type: DataTypes.CHAR},
    userID: {type: DataTypes.BIGINT},
})

module.exports = UserEmail;