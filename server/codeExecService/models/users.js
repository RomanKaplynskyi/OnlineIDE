const sequelize = require('../db')

const {DataTypes} = require('sequelize');

const User = sequelize.define('users', {
    login: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    phoneNum: { type: DataTypes.STRING },
    fullName: { type: DataTypes.STRING },
    confirmCode: { type: DataTypes.STRING },
})

module.exports = User;