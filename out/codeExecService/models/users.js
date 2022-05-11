var sequelize = require('../db');
var DataTypes = require('sequelize').DataTypes;
var User = sequelize.define('users', {
    chatId: { type: DataTypes.INTEGER },
    password: { type: DataTypes.CHAR },
    phoneNum: { type: DataTypes.CHAR },
    fullName: { type: DataTypes.CHAR },
    confirmCode: { type: DataTypes.BIGINT },
});
module.exports = User;
//# sourceMappingURL=users.js.map