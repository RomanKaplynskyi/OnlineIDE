import ICodeExecServiceConfig from "./ICodeExecServiceConfig";

export default class BaseExecConfig implements ICodeExecServiceConfig {
  ipAddress: string = 'localhost';
  port: string = '3000';
  sourceRoot:string = './sources';
  timeout:number = 3000;
}