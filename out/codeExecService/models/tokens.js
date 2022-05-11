var sequelize = require('../db');
var DataTypes = require('sequelize').DataTypes;
var TokenDB = sequelize.define('tokens', {
    token: { type: DataTypes.CHAR },
    userID: { type: DataTypes.BIGINT },
});
module.exports = TokenDB;
//# sourceMappingURL=tokens.js.map