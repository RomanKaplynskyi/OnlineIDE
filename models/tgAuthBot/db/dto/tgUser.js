const sequelize = require('../db')
const {DataTypes} = require('sequelize');
const TgUser = sequelize.define('tgUsers', {
  chatId: { type: DataTypes.INTEGER },
  firstName: { type: DataTypes.INTEGER },
  lastName: { type: DataTypes.STRING },
  userName: { type: DataTypes.STRING },
  state: { type: DataTypes.STRING }
})
module.exports = TgUser;