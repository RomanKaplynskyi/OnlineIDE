import { FileSaver, CodeObject} from "./FileSaver"
import JSCodeExecutor from "./codeExecutors/JSCodeExecutor"
import BaseExecConfig from './BaseExecConfig'
import ICodeExecServiceConfig from "./ICodeExecServiceConfig";
export default class CodeHandler {
  config:ICodeExecServiceConfig = new BaseExecConfig()
  executors = {
    'javascript': new JSCodeExecutor(this.config)
  }

  async Handle(ctx): Promise<string> {
    const files: Array<CodeObject> = ctx.files as Array<CodeObject>
    FileSaver.SaveFiles(files, this.config)
    return await this.executors['javascript'].Execute(ctx.files[0].fileName)
  }
}