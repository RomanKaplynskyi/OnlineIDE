<template>
  <v-treeview
    v-model="tree"
    :open="open"
    :items="items"
    activatable
    item-key="name"
    open-on-click
  >
    <template v-slot:prepend="{ item, open }">
      <v-icon v-if="!item.file">
        {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
      </v-icon>
      <v-icon v-else>
        {{ files[item.file] }}
      </v-icon>
    </template>
<!--    <template v-slot:append="{item}">-->
<!--      <v-btn v-if="!item.file">add</v-btn>-->
<!--      <v-btn>X</v-btn>-->
<!--    </template>-->
  </v-treeview>
</template>

<script lang="ts">
  import { Vue, Component } from "vue-property-decorator"
  @Component
  export default class FileExplorer extends Vue{
    open = ['public']
    files = {
      html: 'mdi-language-html5',
      js: 'mdi-nodejs',
      json: 'mdi-code-json',
      md: 'mdi-language-markdown',
      pdf: 'mdi-file-pdf',
      png: 'mdi-file-image',
      txt: 'mdi-file-document-outline',
      xls: 'mdi-file-excel',
    }
    tree = []
    items = [
      // {
      //   name: 'public',
      //   children: [
      //     {
      //       name: 'static',
      //       children: [{
      //         name: 'logo.png',
      //         file: 'png',
      //       }],
      //     },
      //     {
      //       name: 'favicon.ico',
      //       file: 'png',
      //     },
      //     {
      //       name: 'index.html',
      //       file: 'html',
      //     },
      //   ],
      // },
      // {
      //   name: '.gitignore',
      //   file: 'txt',
      // },
      // {
      //   name: 'babel.config.js',
      //   file: 'js',
      // },
      // {
      //   name: 'package.json',
      //   file: 'json',
      // },
      // {
      //   name: 'README.md',
      //   file: 'md',
      // },
      // {
      //   name: 'vue.config.js',
      //   file: 'js',
      // },
      {
        name: 'test.js',
        file: 'js',
      },
    ]
  }
</script>
<style scoped>
</style>