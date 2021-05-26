<template>
  <v-app id="inspire" app>
    <v-app-bar app color="dark" flat>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-container class="py-0 fill-height">
        <v-avatar class="mr-10" color="grey darken-1" size="32"></v-avatar>
        <v-spacer></v-spacer>
        <v-responsive max-width="195">
          <v-text-field dense flat hide-details rounded solo-inverted></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-sheet color="grey" class="pa-4">
        <v-avatar class="mb-4" color="grey darken-1" size="220"></v-avatar>
        <div>john@vuetifyjs.com</div>
      </v-sheet>
      <v-divider></v-divider>
      <v-list>
        <v-list-item v-for="[icon, text] in links" :key="icon" link><v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: false,
    group: null,
    links: [
      ['mdi-inbox-arrow-down', 'Inbox'],
      ['mdi-send', 'Send'],
      ['mdi-delete', 'Trash'],
      ['mdi-alert-octagon', 'Spam'],
      ['mdi-alert-octagon', 'Spaaaaam'],
    ],
  }),
}
</script>
