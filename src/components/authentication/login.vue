<template>
  <v-card class="mx-auto top" max-width="500" style="border-radius: 10px">
    <v-card-title class="justify-center pt-5 mb-4">Login</v-card-title>
    <v-form v-model="isValid">
      <v-text-field class="text" id="email" label="Email" type="email"
                    clearable required :rules="emailRules" v-model="user.email"
                    outlined></v-text-field>
      <v-text-field class="text" id="password" label="Contraseña"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'" v-model="user.password"
                    @click:append="show = !show" clearable required :rules="rules"
                    outlined @keyup.enter="handleLogin"></v-text-field>
      <v-card-actions>
        <v-btn :disabled="!isValid" class="mx-auto" block style="border-radius: 10px"
               color="#226bdd" dark @click="handleLogin">Login</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn id="register" to="/register" block  style="border-radius: 10px" class="mx-auto" dark color="#393e4e" type="submit">Aun no tienes cuenta</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
import User from "@/models/user";

export default {
  name: "login",
  data() {
    return {
      user: new User('','','','','',''),
      show: false,
      loading: false,
      isValid: true,
      emailRules: [
        v => !!v || 'Email es requerido',
        v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail inválido.',
      ],
      rules: [
        v => !!v || 'Este campo es requerido'
      ],
    }
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/');
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      console.log('Starting Login handling');
      if (!this.isValid) {
        console.log('Invalid');
        this.loading = false;
        return;
      }
      if (this.user.email && this.user.password) {
        console.log('Loggin in...');
        this.$store.dispatch('auth/login', this.user).then(
            (user) => {
              console.log('Logged In');
              console.log(user);
              this.$router.push(`/`);
            },
            error => {
              console.log('Error');
              this.loading = false;
              this.message = (error.response && error.response.data)
                  || error.message || error.toString();
            }
        )
      }
    }
  },
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
