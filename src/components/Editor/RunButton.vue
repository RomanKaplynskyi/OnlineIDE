<template>
  <div>
    <v-btn width="120px" height="50px" id="runBtn">Run</v-btn>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import config from "../../../projectConfig"
import ListItem from "@/components/Editor/ListItem";
@Component
export default class RunButton extends Vue {
  onClick(files:Array<ListItem>) {
    console.dir({ files: files })
    const fileAsJson = JSON.stringify({ files })
    const codeExecutorUrl : string = `${config.codeExecServiceUrl}/runCode`
    fetch(codeExecutorUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: fileAsJson
    })
      .then(res => res.json())
      .then(res => {
        console.log(files)
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