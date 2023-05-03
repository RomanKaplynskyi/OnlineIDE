const TelegramBot = require('node-telegram-bot-api');

const token = '5596152109:AAEnWkNT4z-CQ-RlzauGf4_RGIOpYIWZT78';

const bot = new TelegramBot(token);
const USER_STATES = {
  ON_LOGIN_SENDING: 'ON_LOGIN_SENDING',
  ON_CODE_SENDING: 'ON_CODE_SENDING',
  REGISTERED: 'REGISTERED'
}

// db
const TgUser = require('./db/dto/tgUser')
const Users = require('../../server/codeExecService/models/users')

async function addUser (chat) {
  return await TgUser.create({
    chatID: chat.id,
    firstName: chat.first_name,
    lastName: chat.last_name,
    userName: chat.username,
    state: USER_STATES.ON_LOGIN_SENDING
  })
}

bot.onText(/\/start/, async msg => {
  const chatID = msg.chat.id;
  // send back the matched "whatever" to the chat
  let user = await TgUser.findOne({ where: { chatID } })
  if (!user) {
    user = await addUser(msg.chat)
  }
  if (user.state === USER_STATES.ON_LOGIN_SENDING) {
    await bot.sendMessage(chatID, 'Welcome to OnlineIDE! Lets register you, to provide you the best experience! First of all - share with us your login');
  } else {
    await bot.sendMessage(chatID, 'You in stage login sending');
  }
})

/*bot.onText(/\/back/, async msg => {
  const chatID = msg.chat.id;
  // send back the matched "whatever" to the chat
  const user = await TgUser.findOne({ where: { chatID } })
  if (user.state === USER_STATES.ON_CODE_SENDING) {
    await TgUser.update({ state: USER_STATES.ON_LOGIN_SENDING }, { where: { chatID } })
    await bot.sendMessage(chatID, 'Waiting for new login sending');
  }
})*/

//login sending
bot.onText(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, async msg => {
  console.log(msg)
  const chatID = msg.chat.id;
  const tgUser = await TgUser.findOne({ where: { chatID: chatID } })
  if (!tgUser) {
    await bot.sendMessage(chatID, 'Something gone wrong! we dont know what to do now')
    return
  }
  if (tgUser.state === USER_STATES.ON_CODE_SENDING) {
    await bot.sendMessage(chatID, 'We are waiting to receive your code from OnlineIDE')
    return
  }
  if (tgUser.state === USER_STATES.ON_LOGIN_SENDING) {

  }

  const user = await Users.findOne({ where: { login: msg.text } })
  if (!user) {
    await bot.sendMessage(chatID, 'User not exists. Try again with another login or connect to administrators')
    return
  }
  await TgUser.update({ userID: user.id, state: USER_STATES.ON_CODE_SENDING }, { where: { chatID: chatID } })
  await bot.sendMessage(chatID, 'Now please send code that from OnlineIDE');
})

//code sending
bot.onText( /[\\s\\S]*/, async msg => {
  const chatID = msg.chat.id;
  // send back the matched "whatever" to the chat
  const tgUser = await TgUser.findOne({ where: { chatID } })
  if (tgUser.state !== USER_STATES.ON_CODE_SENDING) {
    await bot.sendMessage(chatID, 'We are waiting to receive your email from OnlineIDE')
    return
  }
  const user = await Users.findOne({ where: { id: tgUser.userID } })
  if (user.confirmCode !== msg.text) {
    await bot.sendMessage(chatID, 'Code from OnlineIDE not match code that you send');
    return
  }
  await TgUser.update({ state: USER_STATES.REGISTERED }, { where: { chatID } })
  await Users.update({ confirmCode: null }, { where: { id: user.id } })
  await bot.sendMessage(chatID, 'Your successfully connected two factor auth');
})

module.exports = bot
