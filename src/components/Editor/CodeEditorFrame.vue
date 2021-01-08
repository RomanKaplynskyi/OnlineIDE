<template>
  <div>
    <v-container>
      <v-row>
        <v-spacer></v-spacer>
        <v-col align-self="start" cols="auto">
          <run ref="runBtn" :files="files" />
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <files></files>
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
import { Vue, Component } from "vue-property-decorator"
import editor from './Editor.vue'
import run from './RunButton.vue'
import Output from './Output.vue'
import files from "./FileExplorer.vue"
@Component({
  components: {
    editor,
    run,
    files,
    'code-exec-output': Output
  }
})
export default class CodeEditorFrame extends Vue{
  editorRef : editor | null = null
  outputRef : Output | null = null
  runBtn : run | null = null
  output : string | null = null
  mounted() {
    this.editorRef = this.$refs.editor as editor
    this.runBtn = this.$refs.runBtn as run
    this.outputRef = this.$refs.output as Output
    this.runBtn.$on('code-exec-done',(res:string) => {
      if (this.outputRef) {
        this.output = res
        this.outputRef.$emit('update', res)
      }
    })
  }
  // TODO Remove from here
  get files() { return [{ fileName: 'test.js', code: this.editorRef?.editorData }] }

}
</script>

<style scoped>

</style>