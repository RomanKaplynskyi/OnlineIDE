import {PGRepository} from "../repositories/PGRepository";
import Project from '../models/project'
import {UserRepository} from "../repositories/UserRepository";
import Koa from "koa";
export default class ProjectController {
  static async addProject (ctx :  Koa.ParameterizedContext) {
    console.log('try to add project')
    const project = new PGRepository<Project>('project')
    console.log(ctx.request.body)
    const projectData = ctx.request.body as Project
    await project.saveEntity(projectData)
    ctx.body = { successful: true }
  }

  static async getProjects (ctx :  Koa.ParameterizedContext) {
    const id = 176 //ctx.body.userID
    if (!id) return
    console.log(ctx.session)
    const project = new PGRepository<Project>('project')
    const userRepository = new UserRepository()
    const User = await userRepository.findByField<number>('id', id)
    const projects = await project.findAllByField<number>('userID', User.id)
    ctx.body = { projects }
  }
}