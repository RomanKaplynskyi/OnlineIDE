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
      <v-card-text v-if="successMsgVisible" style="color: green">You are logged in!</v-card-text>
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
    <confirmCode :visible.sync="confirmCodeVisible"/>
  </v-dialog>
</template>

<script lang="ts">
import register from './Register.vue';
import confirmCode from './ConfirmCode.vue';
import {Component, Prop, Vue} from "vue-property-decorator"
import config from "../../../projectConfig"

@Component({
  components: {
    register,
    confirmCode
  }
})
export default class LogIn extends Vue {
  @Prop() visible: boolean = false

  registerVisible: boolean = false
  confirmCodeVisible: boolean = false
  errorMsgVisible: boolean = false
  successMsgVisible: boolean = false

  login: string = ''
  pass: string = ''

  async tryLoginViaMicrosoft () {
    console.dir('asdsa')
    const codeExecutorUrl : string = `${config.codeExecServiceUrl}/logViaMicrosoft`
    window.location.href = codeExecutorUrl
  }

  async tryLogin () {
    if (this.pass && this.login) {
      let codeExecutorUrl : string = `${config.codeExecServiceUrl}/logIn`
      fetch(codeExecutorUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ login: this.login, password: this.pass })
      })
          .then(resp => resp.json())
          .then(result => {
            if (result && result.res) {

              this.visible = false
              this.confirmCodeVisible = true
              //this.successMsgVisible = true
              //setTimeout(() => this.successMsgVisible = false, 5000)
              console.log('Authentication success!')
              // to do: нужно где-то сохранять логин  или ID чтоб потом юзать его на форме подтверждения кода
            } else {
              this.errorMsgVisible = true
              setTimeout(() => this.errorMsgVisible = false, 5000)
              console.log('Authentication error!')
            }
          })
    }
  }

  async openRegBot () {
    window.open('http://t.me/OnlineIDELog_bot', '_blank');
  }

}
</script>

<style scoped>

</style>