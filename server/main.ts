import Koa from 'koa';
const app = new Koa();
import serve from 'koa-static'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser';
import "reflect-metadata";
import { restRouter } from './routes/users';

const PORT = process.env.PORT || 3099;

restRouter.get('/', async ctx => {
  ctx.body = 'hello world';
  ctx.status =200;
})

export const main = async () => {

  app.use(bodyParser());
  app.use(serve('../../dist'))
  app.use(cors());
  app.use(restRouter.routes());
}
main();
export const server = app.listen(PORT, () => {
  console.log(`Koa started on PORT ${PORT}`);
});







