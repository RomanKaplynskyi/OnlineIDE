<template>
  <v-container :loading="true">
    <v-row
      absolute
      color="white"
      elevate-on-scroll
      app
    >
      <v-spacer />
      <v-btn
        text
        @click.native="projectDialogVisible = true"
      >
        Add Project
      </v-btn>
    </v-row>

    <v-col v-for="(project, index) in projects" :key="index">
      <v-card width="400">
        <v-card-title>
          {{ project.name }}
        </v-card-title>
        <v-card-subtitle>
          <span>
            {{ project.author }}
          </span>
        </v-card-subtitle>
        <v-card-text>
          {{ project.description }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
          >
            Open
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
    <project-dialog @success="loadData" :visible.sync="projectDialogVisible" />
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ProjectDialog from "@/components/projects/ProjectDialog.vue";

@Component({
  components: {
    ProjectDialog
  }
})
export default class ProjectFrame extends Vue {
  projectDialogVisible: boolean = false
  // projects = [{
  //   name: 'test',
  //   description: 'test descr',
  //   author: 'ddd'
  // }]

  projects = [ ]

  mounted () {
    this.loadData()
  }

  async loadData () {
    const res = await fetch('http://localhost:3099/getProjects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    })

    const json = await res.json()

    this.projects = json.projects
  }


}
</script>

<style scoped>

</style>