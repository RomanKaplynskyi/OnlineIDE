import ICodeExecServiceConfig from '../ICodeExecServiceConfig'
import BaseExecConfig from "../BaseExecConfig";
export interface ICodeExecutor {
  config: ICodeExecServiceConfig
  Execute(code: string) : Promise<string> | null
}

export abstract class AbstractCodeExecutor implements ICodeExecutor{
  config = new BaseExecConfig()
  constructor(config: ICodeExecServiceConfig) {
    this.config = config
  }
  Execute(code: string): Promise<string> | null {
    throw new Error('Abstract')
  }
}