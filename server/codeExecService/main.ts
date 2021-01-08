import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors'
import _CodeHandler from "./CodeHandler";
const app = new Koa();
const router = new Router();
const PORT = 3000;
const CodeHandler = new _CodeHandler()
app.use(bodyParser());
app.use(cors())
app.use(router.routes());
router.get('/', async (ctx) => {
  ctx.body = { msg: 'Hello world' };
})

router.post('/runCode', async (ctx, next) => {
  await next()
  const data = ctx.request.body
  if (data) {
    const msg:string = await CodeHandler.Handle(data).catch(res => res)
    console.log(msg)
    ctx.body = { msg }
  }
});



app.listen(PORT, () => {
  console.log('Koa started!');
});