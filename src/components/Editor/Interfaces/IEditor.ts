import ListItem from "@/components/Editor/ListItem";
import {editor} from "monaco-editor";
import ITextModel = editor.ITextModel;

export interface IEditor {
  /**  Create model and save it by name then set it as current */
  createModel(listItem: ListItem) : void
  /** Set model by name */
  SetModel(name: string) : void
  /**  Get current model */
  GetCurrentModel () : ITextModel | null
}