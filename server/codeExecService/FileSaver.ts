// @ts-ignore
import { writeFile } from "fs";
import ICodeExecServiceConfig from "./ICodeExecServiceConfig";
export class CodeObject {
  fileName:string
  code:string
}

export class FileSaver {
  static SaveFiles (files: Array<CodeObject>, config:ICodeExecServiceConfig) : void {
    files.forEach(({fileName, code}) => {
      writeFile(`${config.sourceRoot}/${fileName}`, code, function (err) {
        if (err) return console.log(err);
        console.log(`${fileName} was successfully written`);
      });
    })
  }
}