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
        <v-list-item v-if="isUserLoged" class="px-2">
          <v-list-item-avatar hidden="true">
            <v-img :src="`https://randomuser.me/api/portraits/lego/${Math.ceil(Math.random() * 12)}.jpg`"></v-img>
          </v-list-item-avatar>
        </v-list-item>


       <v-list-item v-if="isUserLoged" link ref="logoutButton">
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
<!--        <v-list-item :to="'/projects'" link>-->
<!--          <v-list-item-icon>-->
<!--            <v-icon>mdi-folder</v-icon>-->
<!--          </v-list-item-icon>-->
<!--          <v-list-item-title>My Projects</v-list-item-title>-->
<!--        </v-list-item>-->
        <v-list-item link :to="'/editor'">
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Editor</v-list-item-title>
        </v-list-item>
<!--        <v-list-item link ref="logOutButton">-->
<!--          <v-list-item-icon>-->
<!--            <v-icon>mdi-star</v-icon>-->
<!--          </v-list-item-icon>-->
<!--          <v-list-item-title>Log out</v-list-item-title>-->
<!--        </v-list-item>-->
      </v-list>
      <login :visible.sync="visible" />
    </v-navigation-drawer>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import login from '../authorization/LogIn.vue';
//import User from "@/components/authorization/User";
import config from "../../../projectConfig";
@Component({
  components: {
    login
  }
})
export default class SideMenu extends Vue {
  visible: boolean = false
  isUserLoged: boolean = true
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