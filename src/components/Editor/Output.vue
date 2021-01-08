<template>
  <div>
    <h3> {{out}} </h3>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
@Component
export default class Output extends Vue {
  @Prop() codeExecRec!: string
  get out (){
    return this.codeExecRec
  }
  mounted() {
    this.$on('update', (val:string) => {
      this.codeExecRec = val
    })
  }
}
</script>

<style scoped>

</style>