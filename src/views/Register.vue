<template>
<div>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="4">
        <v-card flat>
          <v-card-title>Register</v-card-title>
          <v-card-text>
            <v-form>
              <v-container>
                <v-row>
                  <v-col>
                    <v-text-field
                        v-model="login"
                        :counter="100"
                        label="Login"
                        required
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                        v-model="fullName"
                        :counter="100"
                        label="Full name"
                        required
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                        v-model="pass"
                        :counter="100"
                        label="Password"
                        required
                    />
                  </v-col>
                  <v-col>
                    <v-text-field
                        v-model="confirmPass"
                        :counter="100"
                        label="Confirm pass"
                        required
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-text v-if="errorMsgVisible" style="color: red">Please, fill in all required fields!</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="blue darken-1"
                text
                @click="closeClick"
            >
              Close
            </v-btn>
            <v-btn
                color="blue darken-1"
                text
                @click.native="tryRegister"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog
      v-model="dialog"
      width="500"
  >
    <v-card>
      <v-card-title
          class="headline grey lighten-2"
          primary-title
      >
        Use this Confirm Code to connect telegram bot auth
      </v-card-title>

      <v-card-text>
        {{confirmCode}}
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="primary"
            flat
            @click="getItClick"
        >
          I get it
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

</div>

</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
@Component
export default class Register extends Vue {
  @Prop() dialog: boolean = false
  errorMsgVisible: boolean = false

  login: string = ''
  pass: string = ''
  confirmPass: string = ''
  fullName: string = ''
  confirmCode: string = ''

  async tryRegister () {
    if (this.login && this.pass && this.fullName) {
      const response = await fetch('http://localhost:3099/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ email: this.login, password: this.pass, fullName: this.fullName })
      })
      console.log(response)
      if (response.status === 200) {
        window.open('http://t.me/OnlineIDELoginBot', '_blank');
        const js = await response.json()
        this.confirmCode = js.confirmCode
        this.dialog = true
      }
    } else {
      this.errorMsgVisible = true
    }

  }

  getItClick () {
    this.dialog = false
    const redirectURL : string = 'http://localhost:8080/'
    window.location.href = redirectURL
  }

  closeClick () {
    const redirectURL : string = 'http://localhost:8080/'
    window.location.href = redirectURL
  }
}
</script>

<style scoped>

</style>