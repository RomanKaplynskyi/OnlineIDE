export default interface ICodeExecutor {
  Execute(code: string) : Promise<string> | null
}