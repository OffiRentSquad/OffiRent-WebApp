<template>
  <div>
    <v-card class="mx-auto display-1" max-width="600" style="border-radius: 10px">
      <v-card-title class="box justify-center">Datos Personales</v-card-title>
      <v-divider></v-divider>
      <v-card-subtitle class="inf" v-if="user.isPremium===true">
        <v-icon class="ico" left >mdi-check-decagram</v-icon>
        Premium
      </v-card-subtitle>
      <v-card-subtitle class="inf" v-else>
        <v-icon class="ico" left >mdi-check-decagram</v-icon>
        Non-Premium
      </v-card-subtitle>
      <v-divider inset></v-divider>
      <v-card-subtitle class="inf">
        <v-icon class="ico" left>mdi-account</v-icon>
        {{user.fullName}}
      </v-card-subtitle>
      <v-divider inset></v-divider>
      <v-card-subtitle class="inf">
        <v-icon class="ico" left>mdi-email</v-icon>
        {{user.email}}
      </v-card-subtitle>
      <v-divider inset></v-divider>
      <v-card-subtitle class="inf">
        <v-icon class="ico" left>mdi-cake-variant</v-icon>
        {{formatDate(user.birthDay.split("T")[0])}}
      </v-card-subtitle>
      <v-divider inset></v-divider>
      <v-card-subtitle class="inf">
        <v-icon class="ico" left>mdi-phone</v-icon>
        {{user.phoneNumber}}
      </v-card-subtitle>
      <v-divider inset></v-divider>
      <v-card-subtitle class="inf">
        <v-icon class="ico" left>mdi-calendar</v-icon>
        {{formatDate(user.joinDate.split("T")[0])}}
      </v-card-subtitle>
      <v-divider inset></v-divider>
      <v-card-actions>
        <v-btn to="/profile/edit" class="mt-4" block  color="#226bdd" style="color: white; border-radius: 10px">
          <v-icon left>mdi-account-edit</v-icon>Editar Perfil
        </v-btn>
      </v-card-actions>
      <v-card-actions v-if="user.isPremium === false">
        <v-btn to="/profile/premium" class="mb-2" block color="#226bdd" style="color: white; border-radius: 10px">
          <v-icon left>mdi-account-edit</v-icon>Cambiate a Premium
        </v-btn>
      </v-card-actions>
      <v-card-actions v-else>
        <v-btn to="/profile/cancel-premium" class="mb-2" block color="#226bdd" style="color: white; border-radius: 10px">
          <v-icon left>mdi-account-edit</v-icon>Cancelar Premium
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>

import UserService from '@/services/user-service';
import User from "@/models/user";

export default {
  name: "view-profile",
  data() {
    return {
      user: User,
    }
  },
  methods: {
    getContent() {
      UserService.getUserById(1).then(
          response => {
            this.user = response.data;
          }).catch( e => {
        console.log((e));
      })
    },
    formatDate (date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
  },
  mounted(){
    this.getContent();
  }
}
</script>

<style scoped>
.box {
  margin-top: 3em;
}
@media screen and (max-width: 690px) {
  .box {
    margin-top: 1em;
  }
}
.inf {
  margin-left: 1.5em;
  font-size: 16px;
}
.ico {
  margin-top: -4px;
}

</style>
