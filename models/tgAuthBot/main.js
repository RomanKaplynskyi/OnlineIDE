const bot = require('./bot')
const sequelize = require('./db/db')


async function main () {
    console.log('Starting')
    try {
        await sequelize.authenticate()
        console.log('Database connected...')
    } catch (e) {
        console.error(e)
        return
    }
    await sequelize.sync({ force: true });
    bot.startPolling()
}
main()