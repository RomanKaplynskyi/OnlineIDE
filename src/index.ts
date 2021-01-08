import Koa from 'koa';
import Router from 'koa-router';
//import bodyParser from "koa-bodyparser";

const app = new Koa();
const router = new Router();
const PORT = 3000;

router.get('/', async (ctx) => {
  ctx.body = { msg: 'Hello world' };
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(PORT, () => {
  console.log('Koa started!');
});