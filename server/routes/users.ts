import Router from 'koa-router';
import controller from '../controllers/users';
import projectController from '../controllers/ProjectController';
import _CodeHandler from "../codeExecService/CodeHandler";
import Koa from "koa";
const CodeHandler = new _CodeHandler()
export const restRouter = new Router();

restRouter.all('/', (ctx: Koa.ParameterizedContext) => {
  console.log("Get / from client")
})

restRouter.post('/register', controller.register);
restRouter.post('/login', controller.login);
restRouter.post('/reset', controller.resetPsw);

restRouter.post('/addProject', projectController.addProject);
restRouter.post('/getProjects', projectController.getProjects);
restRouter.get('/getProjects', projectController.getProjects);

restRouter.get('/projects', (ctx) => {
  ctx.redirect('/')
})

restRouter.get('/editor', (ctx) => {
  ctx.redirect('/')
})

restRouter.post('/runCode', async (ctx, next) => {
  await next()
  const data = ctx.request.body
  if (data) {
    console.log(data)
    try {
      const msg:string | null = await CodeHandler.Handle(data)
      console.log(msg)
      ctx.body = { msg }
    } catch (e) {
      ctx.body = { msg: 'error' }
    }

  }
});




