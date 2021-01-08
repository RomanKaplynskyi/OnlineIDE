<template>
    <v-navigation-drawer
      app
      permanent
      expand-on-hover
      id="menu"
      width="180px"
      height="90vh"
      mini-variant-width="80px"
    >
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img :src="`https://randomuser.me/api/portraits/women/${Math.ceil(Math.random() * 100)}.jpg`"></v-img>
          </v-list-item-avatar>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-list
        nav
        dense
      >
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Editor</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
</template>



<style scoped>
#menu {
  float: left;
}
</style>