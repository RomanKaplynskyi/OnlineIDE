<template>
  <div>
    <v-btn @click.prevent="onClick" width="120px" height="50px" id="runBtn">Run</v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import config from "../../../projectConfig"
@Component
export default class RunButton extends Vue {
  @Prop({type: Array, default: []}) files!:Array<object>
  onClick() {
   console.dir({ files: this.files })
    const codeExecutorUrl : string = `${config.codeExecServiceUrl}/runCode`
    fetch(codeExecutorUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ files: this.files })
    })
      .then(res => res.json())
      .then(res => {
        console.log(this.files)
        this.$emit('code-exec-done', res.msg)
      })
  }
}
</script>

<style>
  #runBtn {
    background-color: white;
    color: green;
  }
  #runBtn:hover {
    background-color: green;
    color: white;
  }
</style>