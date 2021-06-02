import ICodeExecServiceConfig from '../ICodeExecServiceConfig'
import BaseExecConfig from "../BaseExecConfig";
import {CodeObject} from "../FileSaver";
export interface ICodeExecutor {
  config: ICodeExecServiceConfig
  Execute(code: CodeObject) : Promise<string> | null
}

export abstract class AbstractCodeExecutor implements ICodeExecutor{
  config = new BaseExecConfig()
  constructor(config: ICodeExecServiceConfig) {
    this.config = config
  }
  Execute(code: CodeObject): Promise<string> | null {
    throw new Error('Abstract')
  }
}