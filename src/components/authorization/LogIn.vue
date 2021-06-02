<template>
  <v-dialog
    ref="treeViewDialog"
    v-model="visible"
    persistent
    max-width="600px"
  >
    <v-card>
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-form>
          <v-container>
            <v-row>
              <v-text-field
                v-model="login"
                :counter="10"
                label="Login"
                required
              />
            </v-row>
            <v-row>
              <v-text-field
                type="password"
                v-model="pass"
                :counter="10"
                label="Password"
                required
              />
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="blue darken-1"
          text
          plain
          @click="registerVisible = true"
        >
          Register
        </v-btn>
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
            @click="tryLogin"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
    <register :visible.sync="registerVisible"/>
  </v-dialog>
</template>

<script lang="ts">
import register from './Register.vue';
import {Component, Prop, Vue} from "vue-property-decorator"
@Component({
  components: {
    register
  }
})
export default class LogIn extends Vue {
  @Prop() visible: boolean = false

  registerVisible: boolean = false

  login: string = ''
  pass: string = ''

  async tryLogin () {
    const response = await fetch('http://localhost:3099/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ email: this.login, password: this.pass })
    })

    if (response.status === 200) console.log('ok')
  }

}
</script>

<style scoped>

</style>