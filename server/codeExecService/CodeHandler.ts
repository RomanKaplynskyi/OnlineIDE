import { FileSaver, CodeObject} from "./FileSaver"
import JSCodeExecutor from "./codeExecutors/JSCodeExecutor"
export default class CodeHandler {
  executors = {
    'javascript': new JSCodeExecutor()
  }
  async Handle (ctx): Promise<string> {
    const files : Array<CodeObject> = ctx.files as Array<CodeObject>
    FileSaver.SaveFiles(files)
    return await this.executors['javascript'].Execute(ctx.files[0].fileName)
  }
}