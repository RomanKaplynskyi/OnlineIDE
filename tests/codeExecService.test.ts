import JSCodeExecutor from "../server/codeExecService/codeExecutors/JSCodeExecutor";
import ICodeExecServiceConfig from "../server/codeExecService/ICodeExecServiceConfig";
import path from "path";

class TestConfig implements ICodeExecServiceConfig{
  ipAddress: string = 'localhost';
  port: string = '3000';
  sourceRoot: string = path.resolve('./server/codeExecService/sources');
  timeout: number = 3000
}

const executor = new JSCodeExecutor(new TestConfig())

describe('CodeExecService', () => {

  // it('should execute simple "Hello world!', async () => {
  //   const res = await executor.Execute('hello.js')
  //   expect(res).toBe('Hello world!\n');
  // });
  // it('should reject promise', async () => {
  //     // @ts-ignore
  //   await expect(executor.Execute('error.js')).rejects.toMatch(/SyntaxError: Unexpected identifier/)
  // });
  // it('should return timeout error', async () => {
  //   // @ts-ignore
  //   await expect(executor.Execute('timeout.js')).rejects.toMatch(/Command failed:/)
  // });
})
