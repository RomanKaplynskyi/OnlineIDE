// Запускает сервак для выполнения кода
import Koa, {ExtendableContext} from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors'
import _CodeHandler from "./CodeHandler";
import Serve from 'koa-static';
const app = new Koa();
const router = new Router();
const PORT = process.env.PORT || 3099;
const OidManager = require('./models/OidManager')
const OidProvider = require('./models/OidProvider')
const oidManager = new OidManager({ redirectUrl: `http://localhost:3099/login_code` })
const UserModel = require('./models/users')
const UserEmails = require('./models/emails')
const sequelize = require('./db')
const bcrypt = require('bcrypt')
const CodeHandler = new _CodeHandler()
const providerIndex = 0
const user = {
  login: null,
  fullName: null,
  id: null
}
app.use(bodyParser());
app.use(cors())
app.use(router.routes());


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
  //scope: 'https://www.googleapis.com/auth/userinfo.profile',
  scope: 'openid%20email%20profile',
  name: 'Google'
}))

router.get('/', async (ctx) => {
  ctx.body = { msg: 'Hello world' };
})

router.post('/logIn', async (ctx, next) => {
  await next()
  const data = ctx.request.body
  if (data) {
    console.log(data)
    try {
      let userData = null
      const userEmail = await UserEmails.findOne({where: {eMail: data.login}})
      if (userEmail) {
        userData = await UserModel.findOne({where: {id: userEmail.userID}})
      }
      console.log(userData)
      if (userData) {
        user.login = userEmail.eMail
        user.id = userData.id
        const isLogSuccessful = await bcrypt.compare(data.password, userData.password)
        ctx.body = { res: isLogSuccessful }
      } else {
        ctx.body = { res: false}
      }
    } catch (e) {
      ctx.body = { msg: 'error' }
    }
  }
})

router.post('/confirmCode', async (ctx, next) => {
  await next()
  const data = ctx.request.body
  if (data) {
    console.log(data)
    try {
      const userData = await UserModel.findOne({where: {id: user.id}})
      console.log(userData)
      if (userData && userData.confirmCode) {
        const isCodeRight = await bcrypt.compare(data.confirmCode, userData.confirmCode)
        if (isCodeRight) {
          userData.confirmCode = null
          await userData.save()
        }
        ctx.body = { res: isCodeRight }
      } else {
        ctx.body = { res: false}
      }
    } catch (e) {
      ctx.body = { msg: 'error' }
    }
  }
})


router.post('/runCode', async (ctx , next) => {
  await next()
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
  const [header, data] = res.data?.access_token.split('.')
   console.dir({
       header: atob(header),
       data: atob(data)
  })
  ctx.redirect('http://localhost:8080')
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
