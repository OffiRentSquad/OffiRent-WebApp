<template>
  <div>
    <v-card class="mx-auto top" max-width="600">
      <v-card-title class="justify-center">
        <template>
          <v-tooltip v-model="show" left>
            <template v-slot:activator="{ on }">
              <v-btn icon v-on="on">
                <v-icon color="grey lighten-1">
                  mdi-help-circle-outline
                </v-icon>
              </v-btn>
            </template>
            <span>Ingresando su tarjeta acepta el cobro por S/. 180 de membresía premium. </span>
          </v-tooltip>
        </template>
        Ingrese su tarjeta
      </v-card-title>
      <v-divider></v-divider>
      <v-container>
        <v-form v-model="isValid">
          <v-text-field label="Número" class="col-sm-12" type="card"  :rules="numberRules" maxlength="16" counter clearable required>
          </v-text-field>
          <v-row>
            <v-col cols="12" sm="3">
              <v-autocomplete label="MM" class="col-sm-12" :items="months" :rules="rules" required>
              </v-autocomplete>
            </v-col>
            <v-col cols="12" sm="3">
              <v-autocomplete label="YY" class="col-sm-12" :items="years" :rules="rules" required>
              </v-autocomplete>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field label="CVC" class="col-sm-12" :rules="cvcRules" maxlength="3" counter clearable required>
              </v-text-field>
            </v-col>
          </v-row>
          <v-checkbox class="col-sm-12" v-model="user.isPremium" :label="`Acepta T&C`" :rules="[v => !!v]"></v-checkbox>
        </v-form>
      </v-container>
      <v-card-actions>
        <v-btn color="#393e4e" class="ma-auto" width="100%" style="border-radius: 10px" dark @click="backClick">Cancelar</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn :disabled="!isValid" color="#226bdd" class="ma-auto mb-2 white--text" width="100%" style="border-radius: 10px" @click="save">Pagar</v-btn>
      </v-card-actions>
    </v-card>

  </div>
</template>

<script>

import User from "@/models/user";
import UserService from "@/services/user-service";

export default {
  name: "change-to-premium",
  data(){
    return {
      user: User,
      show: false,
      months: ['1','2','3','4','5','6','7','8','9','10','11','12'],
      years: ['2022','2023','2024','2025','2026','2027','2028','2029','2030','2031','2032','2033','2034','2035'],
      option: false,
      isValid: true,
      numberRules: [
        v => !!v || 'Número de tarjeta es requerido',
        v => (v && v.length === 16) || 'Debe contener 16 números',
        v => !/(?=.*[A-Z])/.test(v) || 'No puede contener letras',
        v => !/(?=.*[a-z])/.test(v) || 'No puede contener letras',
        v => !/([!@#$*/?¡¿%])/.test(v) || 'No puede contener caracteres especiales [!@#$%]',
      ],
      yearRules: [
        v => !!v || 'Fecha de vencimiento es requerido',
        v => (v && v.length === 4) || 'Debe contener 4 números',
        v => !/(?=.*[A-Z])/.test(v) || 'No puede contener letras',
        v => !/(?=.*[a-z])/.test(v) || 'No puede contener letras',
        v => !/([!@#$*/?¡¿%])/.test(v) || 'No puede contener caracteres especiales [!@#$%]',
      ],
      cvcRules: [
        v => !!v || 'CVC es requerido',
        v => (v && v.length === 3) || 'Debe contener 3 números',
        v => !/(?=.*[A-Z])/.test(v) || 'No puede contener letras',
        v => !/(?=.*[a-z])/.test(v) || 'No puede contener letras',
        v => !/([!@#$*/?¡¿%])/.test(v) || 'No puede contener caracteres especiales [!@#$%]',
      ],
      rules: [
        v => !!v || 'MMYY es requerido',
      ],
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
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
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    UserService.getUserById(this.currentUser.id)
        .then((response) => {
          this.user = response.data
        })
        .catch(e => {
          console.log((e));
        })
  },
}
</script>

<style scoped>
.top {
  margin-top: 4em;
  border-radius: 20px;
}
</style>
