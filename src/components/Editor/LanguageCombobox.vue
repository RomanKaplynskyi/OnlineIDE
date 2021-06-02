<template>
  <v-combobox v-model="selected" label="Language" :items="languages" ></v-combobox>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import languages from "./languages.json"
@Component
export default class LanguageCombobox extends Vue{
  selected = ''
  languages = languages
}

</script>

<style scoped>

</style>