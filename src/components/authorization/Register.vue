<template>
  <v-dialog
      v-model="visible"
      persistent
      max-width="600px"
  >
    <v-card>
      <v-card-title t>Register</v-card-title>
      <v-card-text>
        <v-form>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                    v-model="login"
                    :counter="10"
                    label="Login"
                    required
                />
              </v-col>
              <v-col>
                <v-text-field
                    v-model="fullName"
                    :counter="10"
                    label="Full name"
                    required
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                    v-model="pass"
                    :counter="10"
                    label="Password"
                    required
                />
              </v-col>
              <v-col>
                <v-text-field
                  v-model="confirmPass"
                  :counter="10"
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
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
@Component
export default class Register extends Vue {
  @Prop() visible: boolean = false

  login: string = ''
  pass: string = ''
  confirmPass: string = ''
  fullName: string = ''

  async tryRegister () {
    const response = await fetch('http://localhost:3099/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({ email: this.login, password: this.pass, password2: this.confirmPass })
    })

    if (response.status === 200) console.log('ok')
  }

}
</script>

<style scoped>

</style>