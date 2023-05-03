var sequelize = require('../db');
var DataTypes = require('sequelize').DataTypes;
var User = sequelize.define('users', {
    login: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    phoneNum: { type: DataTypes.STRING },
    fullName: { type: DataTypes.STRING },
    confirmCode: { type: DataTypes.STRING },
});
module.exports = User;
//# sourceMappingURL=users.js.map