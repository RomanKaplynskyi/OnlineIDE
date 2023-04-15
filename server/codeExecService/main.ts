// Запускает сервак для выполнения кода
import Koa, {ExtendableContext} from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors'
import _CodeHandler from "./CodeHandler";
import Serve from 'koa-static';
import User from "../../src/components/authorization/User";
const app = new Koa();
const router = new Router();
const PORT = process.env.PORT || 3099;
const OidManager = require('./models/OidManager')
const OidProvider = require('./models/OidProvider')
const oidManager = new OidManager({ redirectUrl: `http://localhost:3099/login_code` })
const UserModel = require('./models/users')
const TokensDB = require('./models/tokens')
const sequelize = require('./db')
const bcrypt = require('bcrypt')
const jwtKoa = require('koa-jwt')
const koaBody = require('koa-body')
const jwt = require('jsonwebtoken');
const uuid = require('uuid/v4');
const bot = require('../../models/tgAuthBot/bot')
const CodeHandler = new _CodeHandler()
const providerIndex = 1 // 0 - to microsoft and 1 for google openID
const user = {
  login: null,
  fullName: null,
  id: null
}
const sessionTime = 5


const secretJWT = process.env.JWT_SECRET || 'jwt_secret_key';
//Asure OpenID Provider
oidManager.RegisterProvider(new OidProvider({
  tenant_id: 'e85368ce-b733-4d62-9fbb-856330c351fe',
  client_id: '77b1ea08-b5d7-4ee7-a5b1-4bc397d091ac',
  client_secret: 'wIQ7Q~fHxwyJW~67EFfuPGk4t9EQFPr_DDfw6',
  token_url: 'https://login.microsoftonline.com/e85368ce-b733-4d62-9fbb-856330c351fe/oauth2/v2.0/token',
  authorize_url: 'https://login.microsoftonline.com/e85368ce-b733-4d62-9fbb-856330c351fe/oauth2/v2.0/authorize',
  //scope: 'openid%20email%20profile',
  scope: 'openid',
  name: 'Azure'
}))

//Google OpenID Provider
oidManager.RegisterProvider(new OidProvider({
  client_id: '1859055940-emivjbkel8kod0mek6brp6p6hnf8g5sk.apps.googleusercontent.com',
  client_secret: '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',
  token_url: 'https://oauth2.googleapis.com/token',
  authorize_url: 'https://accounts.google.com/o/oauth2/auth',
  // scope: 'https://www.googleapis.com/auth/userinfo.profile',
  scope: 'profile',
  name: 'Google'
}))

app.use(bodyParser());
app.use(cors({
  credentials: true
}))
app.use(router.routes());
router.use(jwtKoa({
  secret: secretJWT
}).unless({ path: [/^\/public|^\/login|^\/confirmCode|^\//] }))

router.post('/runCode', jwtKoa({ secret: secretJWT, cookie: 'token' }), async (ctx , next) => {
  await next()
  console.log(ctx)

  const data = ctx.request.body
  if (data) {
    console.log(data)
    try {
      const msg:string = await CodeHandler.Handle(data).catch(res => res)
      console.log(msg)
      ctx.body = { msg }
    } catch (e) {
      ctx.body = { msg: 'error' }
    }
  }
});

router.get('/wee', jwtKoa({ secret: secretJWT, cookie: 'token' }), async (ctx) => {
  ctx.body = { msg: 'Hello[[[ world' };
})

router.get('/isAuthenticated', jwtKoa({ secret: secretJWT, cookie: 'token' }), async (ctx) => {
  ctx.status = 200
  ctx.body = 'ok'
})

router.post('/logIn', async (ctx, next) => {
  await next()
  const data = ctx.request.body

  if (data) {
    console.log(data)
    try {

      const userData = await UserModel.findOne({where: {login: data.login}})

      console.log(userData)
      if (userData) {
        user.login = userData.login
        user.id = userData.id
        const isLogSuccessful = await bcrypt.compare(data.password, userData.password)
        console.log(isLogSuccessful)
        ctx.body = { res: isLogSuccessful }
        if (isLogSuccessful) {
          await generateToken(userData)
          ctx.body = { res: true}
          // await bot.sendMessage(userData.chatID, `ConfirmationCode to log in: ${userData.confirmCode}`);
          /*ctx.cookies.set('token', jwt.sign({id: userData.id, userName: userData.fullName}, secretJWT), {
            sameSite: 'lax',
            httpOnly: true,
            secure: false,
            maxAge: 99999999
          })*/
        }
      } else {
        ctx.body = { res: false}
      }
    } catch (e) {
      ctx.body = { msg: 'error' }
    }
  }
})

async function generateToken(userData) {
  const date = new Date()
  date.setMinutes(date.getMinutes() + sessionTime)
  const res = await TokensDB.create({
    userID: userData.id,
    token: (Math.random() + 1).toString(36).substring(2),
    expirationDate: date
  });
  return res
}

async function issueTokenPair(userData) {
  const newRefreshToken = uuid();
  await TokensDB.create({
    userID: userData.id,
    token: newRefreshToken,
  });

  return {
    token: jwt.sign({id: userData.id, userName: userData.fullName}, secretJWT),
    refreshToken: newRefreshToken,
  };
}



router.post('/confirmCode', bodyParser(), async (ctx, next) => {
  await next()
  const data = ctx.request.body
  if (data) {
    console.log(data)
    console.log(ctx)
    const userData = await UserModel.findOne({where: {id: user.id}})
    console.log(userData)
    if (!userData || !(await bcrypt.compare(data.confirmCode, userData.confirmCode))) {
      ctx.status = 403
      ctx.body = { msg: 'Invalid user or password'}
      return
    }
    userData.password = null
    ctx.status = 200
    ctx.body = await issueTokenPair(userData)
  }
})

/*router.post('/refreshToken', bodyParser(), async ctx => {
  const { refreshToken } = ctx.request.body;
  const dbToken = await TokensDB.findOne({ where: {token: refreshToken} });
  if (!dbToken) {
    return;
  }
  await TokensDB.destroy({ where: {token: refreshToken }});
  ctx.body = await issueTokenPair(dbToken.userID);
});*/

router.post('/register', async (ctx , next) => {
  await next()
  const confirmCode = (Math.random() + 1).toString(36).substring(2)
  const userData = await UserModel.create({
    login:  ctx.request.body.email,
    password: await bcrypt.hash(ctx.request.body.password, 10),
    fullName: ctx.request.body.fullName,
    confirmCode
  })

  try {
    console.log(userData)
   // user.login = userData.login
    //user.id = userData.id
    await generateToken(userData)
    ctx.body = { res: true, confirmCode}

  } catch (e) {
    ctx.body = { msg: 'error' }
  }

  ctx.body = { 'redirect': "http://t.me/OnlineIDELog_bot", 'confirmCode': confirmCode }
})

router.post('/logout', jwtKoa({secret: secretJWT, cookie: 'token'}), async ctx => {
  // await TokensDB.destroy({ where: {userID: ctx.state.user.id }});
  ctx.cookies.set('token', '')
  ctx.body = { success: true }
})



router.get('/logViaMicrosoft', async (ctx , next) => {
  await next()

  const res = oidManager.GetRedirectHeaderByProvider(oidManager.GetProviderByIndex(providerIndex))
  console.log(res)
  // @ts-ignore
  ctx.redirect(res, 302)
});

router.post('/login_code', async (ctx, next) => {
  await next()
  const { code, state } = ctx.request.body
  const res = await oidManager.AuthUserByCode(code, oidManager.GetProviderByIndex(providerIndex))
  const [header, data] = res.data?.id_token.split('.')
  const responseResult = {
    header: atob(header),
    data: Buffer.from(data, 'base64').toString("utf8")
  }
  console.dir(responseResult)
  const { email } = JSON.parse(responseResult.data)
  const userData = await UserModel.findOne({where: {login: email}})
  ctx.cookies.set('token', jwt.sign({id: userData.id, userName: userData.fullName}, secretJWT), {
    sameSite: 'lax',
    httpOnly: true,
    secure: false,
    maxAge: 99999999
  })
  ctx.response.body = { 'test': 2 }
  ctx.redirect('http://localhost:8080?ddd=212')
})

app.listen(PORT, () => {
  console.log('Koa started on port ' + PORT);
  try {
     sequelize.authenticate().then(() => console.log('Databaze connected...')).catch(err => console.log('Error: ' + err))
     sequelize.sync()
  } catch (e) {
    console.log('Databaze connection failed')
  }
});
//const server = app.listen(PORT)

//module.exports = server
