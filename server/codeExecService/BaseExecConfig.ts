//Базовые настройки
import ICodeExecServiceConfig from "./ICodeExecServiceConfig";

export default class BaseExecConfig implements ICodeExecServiceConfig {
  ipAddress: string = 'localhost';
  port: string = '3099';
  sourceRoot:string = 'D:\\web-ide_\\out\\codeExecService\\sources';
  timeout:number = 3000;
}