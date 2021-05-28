<template>
  <div>
    <v-card class="mx-auto top" max-width="600">
      <v-card-title class="justify-center">Editar perfil </v-card-title>
      <v-divider></v-divider>
      <v-container>
        <v-form v-model="isValid">
          <v-text-field label="Nombre" v-model="user.fullName" :rules="[v => !!v || 'Nombre es requerido']" clearable required></v-text-field>
          <v-text-field label="Teléfono" v-model="user.phoneNumber" maxlength="9" counter :rules="phoneNumberRules" clearable required></v-text-field>
          <v-text-field label="Correo" v-model="user.email" :rules="emailRules" clearable required></v-text-field>
          <!--v-text-field label="Contraseña" v-model="user.password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="passwordRules" :type="show ? 'text' : 'password'"
                        @click:append="show = !show"
                        counter clearable required></v-text-field>
          <v-text-field-- label="Confirma tu contraseña" v-model="user.password1" name="input-10-1"
                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :rules="[v => !!v || 'Nickname es requerido',passwordConfirmationRule]"
                        :type="show1 ? 'text' : 'password'"
                        @click:append="show1 = !show1"
                        counter clearable required></v-text-field-->
        </v-form>
      </v-container>
      <v-card-actions>
        <v-btn color="#393e4e" class="ma-auto" width="100%" style="border-radius: 10px" dark @click="backClick">Cancelar</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn :disabled="!isValid" color="#226bdd" class="ma-auto mb-2 white--text" width="100%" style="border-radius: 10px" @click="save">Guardar Cambios</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
<script>

import User from "@/models/user";
import UserService from "@/services/user-service";

export default {
  name: "edit-profile",
  data(){
    return {
      user: User,
      show: false,
      show1: false,
      isValid: true,
      emailRules: [
        v => !!v || 'Email is required',
        v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail inválido.',
      ],
      passwordRules: [
        v => !!v || 'Contraseña es requerido',
        v => (v && v.length >= 5) || 'Debe contener como mínimo 5 caracteres',
      ],
      phoneNumberRules: [
        v => !!v || 'Teléfono es requerido',
        v => !/(?=.*[A-Z])/.test(v) || 'No puede contener letras',
        v => !/(?=.*[a-z])/.test(v) || 'No puede contener letras',
        v => !/([!@#$*/?¡¿%])/.test(v) || 'No puede contener caracteres especiales [!@#$%]',
        v => (v && v.length === 9) || 'Debe tener 9 números'
      ],

    }
  },
  computed: {
    passwordConfirmationRule() {
      return () =>  (this.user.password === this.user.password1) || "Las contraseña deben coincidir";
    },
  },
  methods: {
    backClick() {
      this.navigateToProfile();
    },
    navigateToProfile(){
      this.$router.push({name: 'view-profile'})
    },
    save() {
      UserService.editUser(this.user)
          .then(() => {
            this.navigateToProfile();
          })
          .catch(e => {
            console.log(e);
          })
    },
  },
  mounted() {
    UserService.getUserById(1)
        .then((response) => {
          this.user = response.data
        })
        .catch(e => {
          console.log((e));
        })
  }
}
</script>

<style scoped>
.top {
  margin-top: 4em;
  border-radius: 20px;
}
</style>
