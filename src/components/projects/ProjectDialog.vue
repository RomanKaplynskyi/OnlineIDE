<template>
  <v-dialog
    ref="projectDialog"
    v-model="visible"
    persistent
    max-width="600px"
  >
    <v-card>
      <v-card-text>
        <v-row>
          <v-col>
            <v-text-field
              v-model="projectName"
              :counter="10"
              label="Project name"
              required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
                v-model="projectDescription"
                :counter="10"
                label="Project description"
                required
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-switch
              v-model="isPublic"
              :label="`Is project public ?`"
            ></v-switch>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="blue darken-1"
            text
            @click="$emit('update:visible', false)"
        >
          Close
        </v-btn>
        <v-btn
            color="blue darken-1"
            text
            @click="tryAddProject"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'

@Component
export default class ProjectDialog extends Vue {
  @Prop() visible: boolean = false
  projectName: string = ''
  projectDescription: string = ''
  isPublic: boolean = false

  async tryAddProject () {
    const resp = await fetch('http://localhost:3099/addProject', {
      method: 'POST',
      body: JSON.stringify({ userID: null, name: this.projectName, description: this.projectDescription, isPublic: this.isPublic }),
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    })

    const response = await resp.json()

    if (response.successful) {
      this.$emit('success')
    }
  }

}
</script>

<style scoped>

</style>