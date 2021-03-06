// Запускает сервак для выполнения кода
import Koa, {ExtendableContext} from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors'
import _CodeHandler from "./CodeHandler";
const app = new Koa();
const router = new Router();
const PORT = process.env.PORT || 3099;
const CodeHandler = new _CodeHandler()
app.use(bodyParser());
app.use(cors())
app.use(router.routes());
router.get('/', async (ctx) => {
  ctx.body = { msg: 'Hello world' };
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



app.listen(PORT, () => {
  console.log('Koa started on port ' + PORT);

});
