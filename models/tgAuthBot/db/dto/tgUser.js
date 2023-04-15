const sequelize = require('../db')
const {DataTypes} = require('sequelize');
const TgUser = sequelize.define('tgusers', {
  chatID: { type: DataTypes.INTEGER },
  userID: { type: DataTypes.INTEGER },
  firstName: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
  userName: { type: DataTypes.STRING },
  state: { type: DataTypes.STRING }
})
module.exports = TgUser;