<template>
  <div>
    <v-card class="mx-auto top" max-width="600" elevation="0">
      <v-card-title class="justify-center">
        ¿Seguro que desea cancelar su membresía Premium?
      </v-card-title>
      <v-divider></v-divider>
      <v-container v-model="isValid">
        <v-checkbox class="col-sm-12" v-model="user.isPremium" :label="`Desmarque esta opción para confirmar`" ></v-checkbox>
      </v-container>
      <v-card-actions>
        <v-btn color="#393e4e" class="ma-auto" width="100%" style="border-radius: 10px" dark @click="backClick">Cancelar</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn :disabled="!isValid" color="#226bdd" class="ma-auto mb-2 white--text" width="100%" style="border-radius: 10px" @click="save">Aceptar</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import UserService from "@/services/user-service";
import User from "@/models/user";

export default {
  name: "cancel-premium",
  data(){
    return {
      user: User,
      isValid: true,
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
