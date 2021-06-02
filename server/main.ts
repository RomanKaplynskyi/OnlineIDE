import Koa from 'koa';
const app = new Koa();
import serve from 'koa-static'
import session from 'koa-session'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser';
import "reflect-metadata";
import { restRouter } from './routes/users';
const PORT = process.env.PORT || 3099;

// restRouter.get('/', async ctx => {
//   ctx.status = 200;
//   fs.readFileSync('index.html')
//   console.log(ctx.session)
// })

export const main = async () => {

  app.use(serve('../dist'))
  app.use(bodyParser());
  app.use(cors());
  app.use(session(app));
  app.use(restRouter.routes());

  //await postgresDB();
}
main();
export const server = app.listen(PORT, () => {
  console.log(`Koa started on PORT ${PORT}`);
});







