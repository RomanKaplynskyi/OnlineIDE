<template>
  <v-app id="app">
    <side-menu />
    <v-main>
      <router-view :key="$route.path" />
    </v-main>
    <v-footer app>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import SideMenu from './components/menu/SideMenu.vue';
import codeEditor from './components/Editor/CodeEditorFrame.vue';
@Component({
  components: {
    'side-menu': SideMenu,
    'code-editor': codeEditor
  }
})
export default class App extends Vue {}
</script>