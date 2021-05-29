<template>
  <v-card class="mx-auto top" max-width="500" style="border-radius: 10px">
    <v-card-title class="justify-center pt-5">Login</v-card-title>
    <v-form>
      <v-text-field class="text" id="email" label="Email" type="email"
                    clearable required></v-text-field>
      <v-text-field class="text" id="password" label="Contraseña"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    @click:append="show = !show" clearable required></v-text-field>
      <v-card-actions>
        <v-btn class="mx-auto" block  style="border-radius: 10px" color="#226bdd" dark type="submit">Login</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn to="/register" block  style="border-radius: 10px" class="mx-auto" dark color="#393e4e" type="submit">Aun no tienes cuenta</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      show: false,
    }
  },

  methods: {

  },
  mounted() {

  }
}
</script>

<style scoped>
.top {
  margin-top: 4em;
  padding-bottom: 0.3em;
}
.text{
  margin-left: 1.5em;
  margin-right: 1em;
}
@media screen and (max-width: 570px) {
  .top {
    margin-top: 0;
  }
}
</style>
