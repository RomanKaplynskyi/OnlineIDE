import { writeFile, mkdir, existsSync } from "fs"
import * as config from "../../projectConfig"
export class CodeObject {
  fileName:string
  code:string
}

export class FileSaver {
  static SaveFiles (files: Array<CodeObject>) : void {
    files.forEach(({fileName, code}) => {
      writeFile(`${config.sourcesDirectory}/${fileName}`, code, function (err) {
        if (err) return console.log(err);
        console.log(`${fileName} was successfully written`);
      });
    })
  }
}
