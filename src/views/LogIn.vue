<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="4">
        <v-card flat>
          <v-card-title>Login</v-card-title>
          <v-card-text v-if="stage === 'login'">
            <v-form>
              <v-container>
                <v-row>
                  <v-text-field
                      v-model="login"
                      :counter="100"
                      label="Login"
                      required
                  />
                </v-row>
                <v-row>
                  <v-text-field
                      type="password"
                      v-model="pass"
                      :counter="100"
                      label="Password"
                      required
                  />
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-text v-else>
            <v-form>
              <v-container>
                <v-row>
                  <v-text-field
                    v-model="confirmCode"
                    :counter="100"
                    label="Confirm Code"
                    required
                  />
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-text v-if="errorMsgVisible" style="color: red">Password or Login is incorrect! Please, try again!</v-card-text>
          <v-card-text v-if="userNotExistMsg" style="color: red">User not exist! Please, register before auth!</v-card-text>
          <v-card-text v-if="successMsgVisible" style="color: green">You are logged in!</v-card-text>
          <v-card-text v-if="errorConfCodeMsgVisible" style="color: green">Not valid confirm code!</v-card-text>
          <v-card-actions v-if="stage === 'login'">
            <v-btn
                color="blue darken-1"
                text
                @click="redirectToRegister"
            >
              Register
            </v-btn>
            <v-btn
                color="blue darken-1"
                text
                id="loginViaOpenIdBtn"
                @click="tryLoginViaOpenId"
            >
              Log in via OpenID
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
          <v-card-actions v-else>
            <v-btn
                color="blue darken-1"
                text
                @click="tryToConfirmCode"
            >
              Confirm
            </v-btn>

          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import config from "../../projectConfig";
@Component
export default class LogIn extends Vue {
  confirmCodeVisible: boolean = false
  errorMsgVisible: boolean = false
  successMsgVisible: boolean = false
  errorConfCodeMsgVisible: boolean = false
  stage: string = 'login'
  confirmCode: string = ''
  userID: number = -1

  login: string = ''
  pass: string = ''

  userNotExistMsg : boolean = this.$route.query.userNotExist ? true : false

  async tryLoginViaOpenId () {
    console.dir('asdsa')
    const codeExecutorUrl : string = `${config.codeExecServiceUrl}/logViaOpenID`
    window.location.href = codeExecutorUrl
  }

  async tryLogin () {
    if (this.pass && this.login) {
      let codeExecutorUrl : string = `${config.codeExecServiceUrl}/logIn`
      fetch(codeExecutorUrl, {
        credentials: "include",
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ login: this.login, password: this.pass })
      })
          .then(resp => resp.json())
          .then(result => {
            if (result && result.res) {
              this.confirmCodeVisible = true
              this.stage = 'confirm'
              this.userID = result.userID
            } else {
              this.errorMsgVisible = true
              setTimeout(() => this.errorMsgVisible = false, 5000)
              console.log('Authentication error!')
            }
          })
    }
  }

  async tryToConfirmCode () {
    if (this.confirmCode) {
      let codeExecutorUrl : string = `${config.codeExecServiceUrl}/tryToConfirmCode`
      fetch(codeExecutorUrl, {
        credentials: "include",
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ confirmCode: this.confirmCode, userID: this.userID })
      })
          .then(resp => resp.json())
          .then(result => {
            if (result && result.res) {

              this.$router.push({ path: '/' })
            } else {
              this.errorConfCodeMsgVisible = true
              setTimeout(() => this.errorMsgVisible = false, 5000)
              console.log('Not valid confirm code!')
            }
          })
    }
  }

  redirectToRegister () {
    const redirectURL : string = 'http://localhost:8080/register'
    window.location.href = redirectURL
  }
}
</script>

<style scoped>

</style>