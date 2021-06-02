import IListItemActions from "@/components/Editor/IListItemActions";
import {editor} from "monaco-editor";
import ITextModel = editor.ITextModel;

export default class ListItem implements IListItemActions{
  name: string | null = null
  file: string | null = null
  children: Array<ListItem>  = []
  parent: ListItem | null = null
  path: string  = ""
  isFolder: boolean = false

  model: Function  = () => {}

  constructor(params: { name: string, file: string, children: Array<ListItem>, isFolder: boolean }) {
    this.name = params.name;
    this.file = params.file;
    this.children = params.children
    this.isFolder = params.isFolder
  }

  addFile(item:ListItem): void {
    this.children.push(item)
    item.parent = this;
    item.path += this.path + '/' + item.name
  }

  addFolder(item:ListItem): void {
    this.children.push(item)
    item.parent = this;
    item.path += this.path + '/' + item.name
  }

  delete(item:ListItem): void {
    const parent : ListItem | null= item.parent;
    if (!parent) return;
    parent.children.splice(parent.children.indexOf(item), 1)
  }

  toJSON () {
    return {
      name: this.name,
      file: this.file,
      children: this.children,
      model: this.model()?.getValue(),
      isFolder: this.isFolder,
      path: this.path
    };
  }

}