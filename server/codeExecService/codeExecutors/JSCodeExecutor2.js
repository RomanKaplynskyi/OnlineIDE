const { exec } = require("child_process")
class BaseExecConfig {
    ipAddress = 'localhost';
    port = '3000';
    sourceRoot = './sources';
    timeout = 3000;
}
class AbstractCodeExecutor {
    config = new BaseExecConfig()
    constructor(config) {
        this.config = config
    }
    Execute(code) {
        throw new Error('Abstract')
    }
}
class JSCodeExecutor2 extends AbstractCodeExecutor {
    Execute(fileName) {
        if (!fileName) return null
        return new Promise((resolve, reject) => {
            const sourceRoot = this.config ? this.config.sourceRoot : ''
            const timeout = this.config ? this.config.timeout : 0
            exec(`cd ${sourceRoot} && node ${fileName}`, { timeout }, (error, stdout, stderr) => {
                if (error || stderr) {
                    const errMessage = error ? error.message : ''
                    reject(errMessage || stderr )
                } else {
                    resolve(stdout)
                }
            })
        })

    }
}
module.exports = {
    JSCodeExecutor2
}

