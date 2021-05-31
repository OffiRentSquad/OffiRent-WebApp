<template>
  <div>
    <v-card class="mx-auto display-1" max-width="600" style="border-radius: 10px">
      <v-card-title class="box justify-center">Datos Personales</v-card-title>
      <v-divider></v-divider>
      <v-divider inset></v-divider>
      <v-card-subtitle class="inf">
        <v-icon class="ico" left>mdi-account</v-icon>
        {{user.fullName}}
      </v-card-subtitle>
      <v-divider inset></v-divider>
      <v-card-subtitle class="inf">
        <v-icon class="ico" left>mdi-email</v-icon>
          <a v-text="user.email" href="mailto:offirent2021@gmail.com" style="color: inherit;
           text-decoration: none; border-radius: 10px">
          </a>
      </v-card-subtitle>
      <v-divider inset></v-divider>
      <v-card-subtitle class="inf">
        <v-icon class="ico" left>mdi-phone</v-icon>
          <a v-text="user.phoneNumber" href="https://api.whatsapp.com/send?phone=51987654321"
             style="color: inherit; text-decoration: none; border-radius: 10px">
          </a>
      </v-card-subtitle>
    </v-card>
  </div>
</template>
<script>
import User from "@/models/user";
import UserService from "@/services/user-service";

export default {
  name: "view-profile-offiprovider",
  data(){
    return {
      user: User,
      id: this.$route.params.id,
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    getContent() {
      UserService.getUserById(this.id).then(
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
    if (!this.currentUser) {
      this.$router.push('/login');
    }
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
