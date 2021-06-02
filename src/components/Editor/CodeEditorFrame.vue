<template>
  <div>
    <v-container>
      <v-row>
        <v-spacer></v-spacer>
        <v-col align-self="start" cols="auto">
          <run @click.native="sendCodeToServer" ref="runBtn" />
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-row no-gutters>
        <v-col @click.prevent>
          <files ref="filesExplorer"></files>
        </v-col>
        <v-col>
          <editor ref="editor"/>
        </v-col>
        <v-col>
          <code-exec-output :codeExecRec="output" ref="output"/>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import ListItem from "./ListItem"
import { Vue, Component } from "vue-property-decorator"
import editor from './Editor.vue'
import run from './RunButton.vue'
import Output from './Output.vue'
import lang from './LanguageCombobox.vue'
import files from "./FileExplorer.vue"
@Component({
  components: {
    editor,
    run,
    lang,
    files,
    'code-exec-output': Output
  }
})
export default class CodeEditorFrame extends Vue{
  output: string = ''
  $refs!: {
    editor: editor,
    output: Output,
    runBtn: run,
    filesExplorer: files,
  }
  mounted() {
    this.$refs.runBtn.$on('code-exec-done',(res:string) => {
      if (this.$refs.output) {
        this.output = res
        this.$refs.output.$emit('update', res)
      }
    })

    this.$refs.filesExplorer.$on('file-added', (item : ListItem) => this.$refs.editor.createModel(item))

    this.$refs.filesExplorer.$on('active', (data: Array<string>) => {
      const model : string = data[0]
      if (!model) return
      this.$refs.editor.SetModel(model)
    })

    // if (window.localStorage.getItem('code')){
    //   const code : string | null = window.localStorage.getItem('code')
    //   if (!code) return
    //   const json = JSON.parse(code)
    //   const files = this.recover(json[0] as ListItem)
    //   console.log(files)
    //
    //   this.$refs.filesExplorer.setFiles([files])
    //
    //   Object.values(this.$refs.editor.models).forEach((v : any) => console.log(v.getValue()) )
    //
    //   return;
    // }

    const curModel = this.$refs.editor.GetCurrentModel()
    this.$refs.filesExplorer.getFiles()[0].children[0].model = () => curModel


  }
  // TODO Remove from here
  get files() : Array<ListItem> {
    return this.$refs.filesExplorer.getFiles()
  }

  sendCodeToServer() {
    this.$refs.runBtn?.onClick(this.files)
  }

  recover(item: ListItem) {
    item = new ListItem({ name: item.name || '', children: item.children, isFolder: item.isFolder, file: item.file || '' })
    item.parent = null
    const recoverHelper = (parent : ListItem, children : Array<ListItem> ) => {
      children.forEach(child => {
        const code = child.model
        child = new ListItem({ name: child.name || '', children: child.children, isFolder: child.isFolder, file: child.file || '' })
        child.parent = parent
        if (!child.isFolder) {
          this.$refs.editor.createModel(child, code.toString())
          console.log(child.model().getValue())
          this.$refs.editor.SetModel('main.js')
        }

        if (child.children.length) {
          recoverHelper(child, child.children)
        }
      })
    }
    recoverHelper(item, item.children)
    console.log(this.$refs.editor.models)
    return item
  }

}
</script>

<style>
  .container {
    margin-left: 0 !important;
  }
</style>