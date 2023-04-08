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
                    label="Login"
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
                @click="registerVisible=true"
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
  registerVisible: boolean = false
  confirmCodeVisible: boolean = false
  errorMsgVisible: boolean = false
  successMsgVisible: boolean = false
  stage: string = 'login'
  confirmCode: string = ''

  login: string = ''
  pass: string = ''

  async tryLoginViaOpenId () {
    console.dir('asdsa')
    const codeExecutorUrl : string = `${config.codeExecServiceUrl}/logViaMicrosoft`
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
              //this.successMsgVisible = true
              //setTimeout(() => this.successMsgVisible = false, 5000)
              this.stage = 'confirm'
              // this.$router.push({ path: '/' })
              // to do: нужно где-то сохранять логин  или ID чтоб потом юзать его на форме подтверждения кода
            } else {
              this.errorMsgVisible = true
              setTimeout(() => this.errorMsgVisible = false, 5000)
              console.log('Authentication error!')
            }
          })
    }
  }

}
</script>

<style scoped>

</style>