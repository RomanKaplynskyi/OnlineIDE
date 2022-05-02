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

      <v-card-text v-if="errorMsgVisible" style="color: red">Password or Login is incorrect! Please, try again!</v-card-text>
      <v-card-actions>
        <v-btn
          color="blue darken-1"
          text
          plain
          @click="openRegBot"
        >
          Register
        </v-btn>
        <v-btn
            color="blue darken-1"
            text
            id="loginViaMicrosoftBtn"
            @click="tryLoginViaMicrosoft"
        >
          Log in via Microsoft
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
            id="logIn"
            @click="tryLogin"
        >
          Log in
        </v-btn>
      </v-card-actions>
    </v-card>
    <register :visible.sync="registerVisible"/>
  </v-dialog>
</template>

<script lang="ts">
import register from './Register.vue';
import {Component, Prop, Vue} from "vue-property-decorator"
import config from "../../../projectConfig"

@Component({
  components: {
    register
  }
})
export default class LogIn extends Vue {
  @Prop() visible: boolean = false

  registerVisible: boolean = false
  errorMsgVisible: boolean = false

  login: string = ''
  pass: string = ''

  async tryLoginViaMicrosoft () {
    console.dir('asdsa')
    const codeExecutorUrl : string = `${config.codeExecServiceUrl}/`
    window.location.href = codeExecutorUrl
  }
  async tryLogin () {
    console.log(this.login)
    console.log(this.pass)

    if (this.pass && this.login) {
      console.log('=======1')

      let codeExecutorUrl : string = `${config.codeExecServiceUrl}/runCode`
      fetch(codeExecutorUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ login: this.login, password: this.pass })
      })
          .then(res => res.json())
          .then(res => {
            console.log('=======2')
            console.log(res.msg)
          })





      /*if (response.status === 200) {
        console.log('ok')
        console.log(response)
      } else {
        this.errorMsgVisible = true
        setTimeout(() => this.errorMsgVisible = false, 5000)
      }*/
    }

  }

  async openRegBot () {
    window.open('http://t.me/OnlineIDELog_bot', '_blank');
  }

}
</script>

<style scoped>

</style>