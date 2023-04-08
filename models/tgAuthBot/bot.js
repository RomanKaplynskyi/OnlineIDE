const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '5596152109:AAEnWkNT4z-CQ-RlzauGf4_RGIOpYIWZT78';
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token);
const USER_STATES = {
  ON_LOGIN_SENDING: 'ON_LOGIN_SENDING',
  ON_CODE_SENDING: 'ON_CODE_SENDING',
  REGISTERED: 'REGISTERED'
}

// db
const TgUser = require('./db/dto/tgUser')
const Emails = require('../../server/codeExecService/models/emails')
const Users = require('../../server/codeExecService/models/users')

async function addUser (data) {
  await TgUser.create({
    chatID: data.chatId,
    firstName: data.first_name,
    lastName: data.last_name,
    userName: data.username,
    state: USER_STATES.ON_LOGIN_SENDING
  })
}

bot.onText(/\/start/, async msg => {
  const chatId = msg.chat.id;
  // send back the matched "whatever" to the chat
  const user = await TgUser.findOne({ where: { chatId } })
  if (!user) {
    await addUser(msg.chat)
  }
  if (user.state === USER_STATES.ON_LOGIN_SENDING) {
    await bot.sendMessage(chatId, 'Welcome to OnlineIDE! Lets register you, to provide you the best experience! First of all - share with us your login');
  } else {
    await bot.sendMessage(chatId, 'You in stage login sending');
  }
})

bot.onText(/\/back/, async msg => {
  const chatId = msg.chat.id;
  // send back the matched "whatever" to the chat
  const user = await TgUser.findOne({ where: { chatId } })
  if (user.state === USER_STATES.ON_CODE_SENDING) {
    await TgUser.update({ state: USER_STATES.ON_LOGIN_SENDING }, { where: { chatId } })
    await bot.sendMessage(chatId, 'Waiting for new login sending');
  }
})

// bot.on('contact', msg => {
//   const chatId = msg.chat.id;
//   const { phone_number, fist_name, last_name, user_id } = msg.contact
//   console.dir({ msg })
//   if (!users[chatId]) {
//     addUser({
//       chatId,
//       fullName: `${msg.chat.first_name} ${msg.chat.last_name}`,
//       phone_number,
//       onWaitEmail: true
//     })
//   } else {
//     users[chatId].onWaitEmail = true
//   }
//   if (user)
//   bot.sendMessage(chatId, `Thank you, ${fist_name} ${last_name}! Now, please, enter your e-mail address, it will be used as login!`);
// })


bot.onText(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, async msg => {
  console.log(msg)
  const chatId = msg.chat.id;
  const tgUser = await TgUser.findOne({ where: { chatID: chatId } })
  if (tgUser.state === USER_STATES.ON_CODE_SENDING) {
    await bot.sendMessage(chatId, 'We are waiting to receive your code from OnlineIDE')
    return
  }
  const email = await Emails.findOne({ where: { eMail: msg.chat.text } })
  if (!email) {
    await bot.sendMessage(chatId, 'User with this email not exist')
    return
  }
  const user = await Users.findOne({ where: { id: email.userID } })
  if (!user) {
    await bot.sendMessage(chatId, 'User not exists. Connect to administrators')
  }
  await Users.update({ chatId }, { where: { id: user.id } })
  await bot.sendMessage(chatId, 'Now please send code that from OnlineIDE');
})

bot.onText( '[\\s\\S]*', async msg => {
  const chatId = msg.chat.id;
  // send back the matched "whatever" to the chat
  const tgUser = await TgUser.findOne({ where: { chatId } })
  if (tgUser.state !== USER_STATES.ON_CODE_SENDING) {
    await bot.sendMessage(chatId, 'We are waiting to receive your email from OnlineIDE')
    return
  }
  const user = await Users.findOne({ where: { chatId } })
  if (user.comfirmCode !== msg.chat.text) {
    await bot.sendMessage(chatId, 'Code from OnlineIDE not match code that you send');
    return
  }
  await TgUser.update({ state: USER_STATES.REGISTERED }, { where: { chatId } })
  await bot.sendMessage(chatId, 'Your successfully connected 2 factor auth');
})

module.exports = bot
