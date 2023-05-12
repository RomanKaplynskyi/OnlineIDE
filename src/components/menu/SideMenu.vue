<template>
    <v-navigation-drawer
      app
      permanent
      id="menu"
      width="180px"
      height="90vh"
      mini-variant-width="80px"
    >
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img :src="`https://randomuser.me/api/portraits/lego/${Math.ceil(Math.random() * 12)}.jpg`"></v-img>
          </v-list-item-avatar>
        </v-list-item>



       <v-list-item link ref="logoutButton">
          <v-list-item-content>
            <v-list-item-title @click.prevent="logOut" class="title">
              Logout
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list
        nav
        dense
      >

        <v-list-item link :to="'/editor'">
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Editor</v-list-item-title>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import config from "../../../projectConfig";

@Component({
  components: {
  }
})
export default class SideMenu extends Vue {
  async logOut() {
    await fetch(config.codeExecServiceUrl+'/logout', {
      credentials: "include",
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
    })
    await this.$router.push({ name: 'Login' })
  }

}

</script>

<style scoped>
#menu {
  float: left;
}
</style>