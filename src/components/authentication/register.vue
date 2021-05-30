<template>
  <v-card class="mx-auto top" max-width="500" style="border-radius: 10px">
    <v-card-title class="justify-center pt-5">Registro</v-card-title>
    <v-form v-model="isValid">
      <v-text-field class="text" id="email" label="Nombre" type="email"
                    clearable required :rules="rules"></v-text-field>
      <v-text-field class="text" id="email" label="Apellido" type="email"
                    clearable required :rules="rules"></v-text-field>
      <v-text-field class="text" id="email" label="Telefono"
                    clearable required maxlength="9" :rules="phoneNumberRules"></v-text-field>
      <v-col cols="12" sm="12">
        <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false"
                :return-value.sync="item.birthDay" transition="scale-transition" offset-y min-width="auto">
          <template v-slot:activator="{ on, attrs }">
            <v-text-field class="text2" v-model="item.birthDay" label="Cumpleaños"
                          readonly v-bind="attrs" v-on="on">
            </v-text-field>
          </template>
          <v-date-picker v-model="item.birthDay" no-title scrollable locale="es-ES"
                         show-current="2003-05-29" max="2003-05-29">
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="menu2 = false"> Cancel
            </v-btn>
            <v-btn text color="primary" @click="$refs.menu2.save(item.birthDay)"> OK
            </v-btn>
          </v-date-picker>
        </v-menu>
      </v-col>
      <v-text-field class="text" id="email" label="Email" type="email"
                    clearable required :rules="emailRules"></v-text-field>
      <v-text-field class="text" label="Contraseña" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="passwordRules" :type="show ? 'text' : 'password'"
                    @click:append="show = !show"
                    counter clearable required></v-text-field>
      <v-text-field class="text" label="Confirma tu contraseña" name="input-10-1"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[v => !!v || 'Nickname es requerido',passwordConfirmationRule]"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                    counter clearable required></v-text-field>
      <v-card-actions>
        <v-btn :disabled="!isValid" class="mx-auto" block  style="border-radius: 10px"
               color="#226bdd" dark type="submit">Registrar</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn to="/login" block  style="border-radius: 10px" class="mx-auto"
               dark color="#393e4e" type="submit">¿Ya tienes cuenta?</v-btn>
      </v-card-actions>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      show: false,
      show1: false,
      isValid: true,
      item: {
        id: 0,
        firstName: '',
        surname: '',
        email: '',
        phoneNumber: '',
        birthDay: '',
      },
      rules: [
          v => !!v || 'Este campo es requerido'
      ],
      phoneNumberRules: [
        v => !!v || 'Teléfono es requerido',
        v => !/(?=.*[A-Z])/.test(v) || 'No puede contener letras',
        v => !/(?=.*[a-z])/.test(v) || 'No puede contener letras',
        v => !/([!@#$*/?¡¿%])/.test(v) || 'No puede contener caracteres especiales [!@#$%]',
        v => (v && v.length === 9) || 'Debe tener 9 números'
      ],
      emailRules: [
        v => !!v || 'Email es requerido',
        v => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v) || 'E-mail inválido.',
      ],
      passwordRules: [
        v => !!v || 'Contraseña es requerido',
        v => (v && v.length >= 5) || 'Debe contener como mínimo 5 caracteres',
      ],
    }
  },
  computed: {
    passwordConfirmationRule() {
      return () =>  (this.user.password === this.user.password1) || "Las contraseña deben coincidir";
    },
  },
  methods:{


  },
}
</script>

<style scoped>
.top {
  margin-top: 4em;
  padding-bottom: 1em;
}
.text{
  margin-left: 1.5em;
  margin-right: 1em;
}
.text2{
  margin-left: 0.7em;
  margin-right: 0.3em;
}
@media screen and (max-width: 570px) {
  .top {
    margin-top: 0;
  }
}
</style>
