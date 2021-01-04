export interface IEditor {
  /**  Create model and save it by name then set it as current */
  createModel(name: string) : void
  /** Set model by name */
  SetModel(name: string) : void
}