var Sequelize = require('sequelize').Sequelize;
module.exports = new Sequelize('onlineideulogdb', 'postgres', 'Windows1', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres'
});
//# sourceMappingURL=db.js.map