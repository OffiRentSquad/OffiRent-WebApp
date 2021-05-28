<template>
  <v-card elevation="0">
    <v-toolbar flat>
      <template v-slot:extension>
        <v-tabs centered v-model="tab">
          <v-tabs-slider color="#393e4e"></v-tabs-slider>
          <v-tab v-for="item in items" :key="item">
            {{item}}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item">
        <v-card flat>
          <v-card-text v-text="text"></v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>
<script>

export default {
  name: "about",
  data () {
    return {
      tab: null,
      items: [
        'Ver todos', 'Buscar',
      ],
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }
  },
}
</script>
