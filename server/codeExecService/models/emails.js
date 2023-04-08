const sequelize = require('../db')

const {DataTypes} = require('sequelize');

const UserEmail = sequelize.define('emails', {
    eMail: {type: DataTypes.STRING},
    userID: {type: DataTypes.BIGINT},
})

module.exports = UserEmail;