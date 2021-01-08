<template>
    <div
      id="editor"
      class="editor"
    />
</template>

<script lang="ts">
// eslint-disable-next-line no-unused-vars
import IStandaloneEditorConstructionOptions = editor.IStandaloneEditorConstructionOptions;
import { editor } from "monaco-editor";
import { Component , Vue,  } from "vue-property-decorator"
import defautCode from "./defaultCode.json"


@Component
export default class Editor extends Vue {
  codeEditor: editor.IStandaloneCodeEditor | null = null
  config: IStandaloneEditorConstructionOptions = {
      value: defautCode.javascript,
      language: 'javascript',
      theme: 'vs-dark',
      wordWrap: 'on',
  }
  mounted() {
    const editorElem:HTMLElement | null = document.getElementById('editor')
    if (editorElem) {
        this.codeEditor = editor.create(editorElem, this.config);
    }
  }
  get editorData (){
    return this.codeEditor?.getValue()
  }
}
</script>

<style>
    .editor {
        float: left;
        margin: auto;
        width: 60vw;
        height: 100vh;
    }
</style>