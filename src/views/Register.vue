<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="4">
        <v-card flat>
          <div>
            <v-dialog
                v-model="visible"
                persistent
                max-width="600px"
            >
              <v-card>
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
                      @click.native="tryRegister"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
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
                      @click="dialog = false"
                  >
                    I get it
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
@Component
export default class Register extends Vue {
  @Prop() visible: boolean = false
  @Prop() dialog: boolean = false

  login: string = ''
  pass: string = ''
  confirmPass: string = ''
  fullName: string = ''
  confirmCode: string = ''

  async tryRegister () {
    const response = await fetch('http://localhost:3099/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ email: this.login, password: this.pass, fullName: this.fullName })
    })

    if (response.status === 200) {
      window.open('http://t.me/OnlineIDELog_bot', '_blank');
      const js = await response.json()
      this.confirmCode = js.confirmCode
      this.dialog = true
    }
  }

}
</script>

<style scoped>

</style>