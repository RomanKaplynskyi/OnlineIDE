<template>
  <code-editor-frame />
</template>

<script>
import CodeEditorFrame from '../components/Editor/CodeEditorFrame.vue'
import { Vue, Component } from 'vue-property-decorator'
@Component({
  components: {
    CodeEditorFrame
  }
})
export default class EditorRouter extends Vue{
}
</script>

<style scoped>

</style>