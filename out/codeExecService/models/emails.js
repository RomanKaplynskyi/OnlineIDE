var sequelize = require('../db');
var DataTypes = require('sequelize').DataTypes;
var UserEmail = sequelize.define('emails', {
    eMail: { type: DataTypes.CHAR },
    userID: { type: DataTypes.BIGINT },
});
module.exports = UserEmail;
//# sourceMappingURL=emails.js.map