<template>
  <v-card class="mx-auto top" max-width="700" elevation="0">
    <v-container fluid>
      <v-card-title class="justify-center font-weight-light title">Intento de Reserva</v-card-title>
      <v-row dense>
        <v-col class="mt-3 grid">
          <v-card elevation="0">
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="6" sm="6">
                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false"
                            :return-value.sync="item.intentDate" transition="scale-transition" offset-y min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="item.intentDate" label="Dia del Intento" prepend-icon="mdi-calendar"
                                      readonly v-bind="attrs" v-on="on">
                        </v-text-field>
                      </template>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-menu ref="menu2" v-model="menu2" :close-on-content-click="false"
                            :return-value.sync="item.reservationProposedStartDate" transition="scale-transition" offset-y min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="item.reservationProposedStartDate" label="Inicio de la Reserva" prepend-icon="mdi-calendar"
                                      readonly v-bind="attrs" v-on="on">
                        </v-text-field>
                      </template>
                      <v-date-picker v-model="item.reservationProposedStartDate" no-title scrollable locale="es-ES">
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu2 = false"> Cancel
                        </v-btn>
                        <v-btn text color="primary" @click="$refs.menu2.save(item.reservationProposedStartDate)"> OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-menu ref="menu3" v-model="menu3" :close-on-content-click="false"
                            :return-value.sync="item.reservationProposedEndDate" transition="scale-transition" offset-y min-width="auto">
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field v-model="item.reservationProposedEndDate" label="Fin de la Reserva" prepend-icon="mdi-calendar"
                                      readonly v-bind="attrs" v-on="on">
                        </v-text-field>
                      </template>
                      <v-date-picker v-model="item.reservationProposedEndDate" no-title scrollable locale="es-ES">
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu3 = false"> Cancel
                        </v-btn>
                        <v-btn text color="primary" @click="$refs.menu3.save(item.reservationProposedEndDate)"> OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click=navigateToPost>
                Cancelar
              </v-btn>
              <v-btn text id="create-booking-intent" @click="postBooking" >
                Publicar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>

import UserService from "@/services/user-service";

export default {
  name: "add-booking-intent",
  data(){
    return {
      id: this.$route.params.id,
      item: {
        id: 0,
        intentDate: '2021-05-26',
        postId: this.$route.params.id,
        userId: this.$store.state.auth.user.id,
        reservationProposedStartDate: this.date,
        reservationProposedEndDate: this.date,
      },
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    postBooking() {
      UserService.postBooking(this.item)
          .then(() => {
            this.navigateToPost();
          })
          .catch(e => {
            console.log(e);
          })
    },
    navigateToPost(){
      this.$router.push(`/posts/${this.id}`);
    },
  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped>
.top{
  margin-top: 4em;
}
.title{
   font-size: 27px;
   margin-bottom: 0.25em;
}
@media screen and (max-width: 690px) {
  .top{
    margin-top: 0;
  }
}

</style>
