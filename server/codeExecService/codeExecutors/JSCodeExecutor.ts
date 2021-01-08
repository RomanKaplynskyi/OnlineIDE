import ICodeExecutor from "./ICodeExecutor"
import { exec } from "child_process"
export default class JSCodeExecutor implements ICodeExecutor {
  Execute(fileName: string): Promise<string> | null {
    if (!fileName) return null

    return new Promise((resolve, reject) => {
      exec(`cd ./sources && node ${fileName}`, (error, stdout, stderr) => {
        console.log(`Error: ${error}`)
        console.log(`Stderr: ${stderr}`)
        if (error || stderr) {
          console.log(`Rejected: ${stderr}`)
          reject(stderr || error)
        } else {
          console.log(`Resolved: ${stdout}`)
          resolve(stdout)
        }
      })
    })

  }
}

