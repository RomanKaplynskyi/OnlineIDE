// @ts-ignore
import { writeFile, mkdir } from "fs";

import ICodeExecServiceConfig from "./ICodeExecServiceConfig";
export class CodeObject {
  name: string | null = null
  file: string | null = null
  children: Array<CodeObject>  = []
  isFolder: boolean = false
  path: string = ''
  model: string = ''
}

export class FileSaver {
  static SaveFiles (files: Array<CodeObject>, config:ICodeExecServiceConfig) : void {
    const saveFileHelper = (files : Array<CodeObject>) => {
      files.forEach(file => {
        if (file.isFolder) {
          console.log(`${config.sourceRoot}/${file.path}`)
          mkdir(`${config.sourceRoot}/${file.path}`, { recursive: true }, (err) => {
            if (err) return console.log(err);
            console.log(`${file.name} folder was successfully written`);
            saveFileHelper(file.children)
          })
        } else {
          writeFile(`${config.sourceRoot}/${file.path}`, file.model || '', function (err) {
            if (err) return console.log(err);
            console.log(`${file.name} file was successfully written`);
          });
        }
      })
    }
    saveFileHelper(files)
  }


}