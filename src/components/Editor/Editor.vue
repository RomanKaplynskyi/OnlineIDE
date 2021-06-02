<template>
    <div
      id="editor"
      class="editor"
    />
</template>

<script lang="ts">
// eslint-disable-next-line no-unused-vars
import IStandaloneEditorConstructionOptions = editor.IStandaloneEditorConstructionOptions;
import ITextModel = editor.ITextModel;
import {editor, languages} from "monaco-editor";
import {Component, Vue,} from "vue-property-decorator"
import defautCode from "./defaultCode.json"
import { IEditor } from "./interfaces/IEditor"
import ListItem from "@/components/Editor/ListItem";

interface IModel {
  [details : string] : ITextModel
}



@Component
export default class Editor extends Vue implements IEditor{
  codeEditor: editor.IStandaloneCodeEditor | null = null

  models: IModel = {}

  config: IStandaloneEditorConstructionOptions = {
    language: 'javascript',
    theme: 'vs-dark',
    wordWrap: 'on',
    model: null
  }
  mounted() {
    const editorElem:HTMLElement | null = document.getElementById('editor')
    if (editorElem) {
      languages.typescript.javascriptDefaults.setEagerModelSync(true)
      this.codeEditor = editor.create(editorElem, this.config);
      // eslint-disable-next-line no-unused-vars
      const defaultModel : ITextModel = editor.createModel(defautCode.javascript,"javascript")
      this.codeEditor.setModel(defaultModel)

      this.models['main.js'] = defaultModel

    }
  }

  createModel (listItem : ListItem, value: string = '') : void {
    if (!listItem || !listItem.name) return
    const model : ITextModel = editor.createModel(value,"javascript")
    this.models[listItem.name] = model

    listItem.model = () : ITextModel | null => listItem && listItem.name ? model : null
  }

  SetModel(name : string) {
    this.codeEditor?.setModel(this.models[name])
  }

  GetCurrentModel () : ITextModel | null{
    return this.codeEditor?.getModel() || null
  }

}
</script>

<style>
    .editor {
      float: left;
      margin: auto;
      width: 50vw;
      height: 100vh;
    }
</style>