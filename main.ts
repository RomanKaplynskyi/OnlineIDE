import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as cors from '@koa/cors'
import * as serve from 'koa-static'
const app = new Koa();
const router = new Router();
const PORT = 8080;
app.use(serve('./dist'))
app.use(bodyParser());
app.use(cors())
app.use(router.routes());

router.get('/', async (ctx) => { })

app.listen(PORT, () => {
  console.log('Koa started!');
});