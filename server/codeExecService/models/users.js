const sequelize = require('../db')

const {DataTypes} = require('sequelize');

const User = sequelize.define('users', {
    chatId: {type: DataTypes.INTEGER},
    password: {type: DataTypes.CHAR},
    phoneNum: {type: DataTypes.CHAR},
    fullName: {type: DataTypes.CHAR},
    confirmCode: {type: DataTypes.BIGINT},
})

module.exports = User;