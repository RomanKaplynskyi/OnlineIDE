import ICodeExecServiceConfig from "./ICodeExecServiceConfig";

export default class BaseExecConfig implements ICodeExecServiceConfig {
  ipAddress: string = 'localhost';
  port: string = '3099';
  sourceRoot:string = 'G:\\work\\web-ide\\out\\codeExecService\\sources';
  timeout:number = 3000;
}