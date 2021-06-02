import { AbstractCodeExecutor } from "./ICodeExecutor"
import { exec } from "child_process"
import {CodeObject} from "../FileSaver";
export default class JSCodeExecutor extends AbstractCodeExecutor {
  Execute(fileName: CodeObject): Promise<string> | null {
    if (!fileName) return null
    console.dir(fileName)
    return new Promise((resolve, reject) => {
      const sourceRoot = this.config ? this.config.sourceRoot : ''
      const timeout = this.config ? this.config.timeout : 0
      exec(`cd ${sourceRoot} && node ${fileName.path}`, { timeout }, (error, stdout, stderr) => {
        console.log(`Error: ${error}`)
        console.log(`Stderr: ${stderr}`)
        if (error || stderr) {
          console.log(`Rejected: ${stderr}`)
          const errMessage = error ? error.message : ''
          reject(errMessage || stderr )
        } else {
          console.log(`Resolved: ${stdout}`)
          resolve(stdout)
        }
      })
    })

  }
}

