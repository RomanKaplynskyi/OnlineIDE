<template>
  <v-dialog
      v-model="visible"
      persistent
      max-width="600px"
  >
    <v-card>
      <v-card-title t>Confirm Code</v-card-title>
      <v-card-text >Now, please, send /getcode to our Telegram bot and enter your confirmation code!</v-card-text>
      <v-card-text>
        <v-form>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                    v-model="confirmCode"
                    :counter="6"
                    label="Code"
                    required
                />
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card-text>
      <v-card-text v-if="errorMsgVisible" style="color: red">Invalid confirm code! Please, try again!</v-card-text>
      <v-card-text v-if="successMsgVisible" style="color: green">You are logged in!</v-card-text>
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
            @click.native="tryConfirmCode"
        >
          Confirm
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator"
import config from "../../../projectConfig";
@Component
export default class ConfirmCode extends Vue {
  @Prop() visible: boolean = false

  confirmCode: string = ''
  errorMsgVisible: boolean = false
  successMsgVisible: boolean = false

  async tryConfirmCode () {
    if (this.confirmCode) {
      let codeExecutorUrl : string = `${config.codeExecServiceUrl}/confirmCode`
      fetch(codeExecutorUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json;charset=utf-8' },
        body: JSON.stringify({ confirmCode: this.confirmCode })
      })
          .then(resp => resp.json())
          .then(result => {
            console.log(result)
            if (result && result.token) {
              this.successMsgVisible = true
              setTimeout(() => this.successMsgVisible = false, 5000)
              console.log('Confirmation success!')
              // to do: success confirm reaction
            } else {
              this.errorMsgVisible = true
              setTimeout(() => this.errorMsgVisible = false, 5000)
              console.log('Confirmation error!')
            }
          })
    }
  }

}
</script>

<style scoped>

</style>