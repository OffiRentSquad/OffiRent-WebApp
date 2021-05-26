<template>
  <div>
    <v-card class="mx-auto top" max-width="800">
      <v-card-title>
        <div class="mt-2 mx-auto title-subjects">
          Intento de Reserva N°{{id}}
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn @click="$router.push(`/booking-intent`)" class="pa-4 mt-4 mb-4 ml-8" color="#226bdd" style="color: white; border-radius: 10px">
          <v-icon left>mdi-arrow-left</v-icon>Volver
        </v-btn>
      </v-card-actions>
      <v-card  class="mx-auto" max-width="720">
        <v-card-title>Dia del Intento</v-card-title>
        <v-card-subtitle>{{formatDate(booking.resource.intentDate.split("T")[0])}}</v-card-subtitle>
        <v-card-title>Inicia</v-card-title>
        <v-card-subtitle>{{formatDate(booking.resource.reservationProposedStartDate.split("T")[0])}}</v-card-subtitle>
        <v-card-title>Acaba</v-card-title>
        <v-card-subtitle>{{formatDate(booking.resource.reservationProposedEndDate.split("T")[0])}}</v-card-subtitle>
        <!--v-card-title>Hecho por </v-card-title>
        <v-card-subtitle>{{booking.resource.user.fullName}}</v-card-subtitle-->
        <v-card-title>Post </v-card-title>
        <v-card-subtitle>
          <v-btn @click="$router.push(`/posts/${booking.resource.postId}`)" class="mt-2" color="#226bdd" style="color: white; border-radius: 10px">
            Ver Post
          </v-btn>
        </v-card-subtitle>
        <v-card-actions>
          <v-btn @click="updateBooking(id, true)" rounded block class="mt-4" color="#226bdd" style="color: white;">
            <v-icon left>mdi-account-edit</v-icon>Aceptar
          </v-btn>
        </v-card-actions>
        <v-card-actions>
          <v-btn @click="updateBooking(id, false)" rounded block warning class="mb-2" color="#226bdd" style="color: white;">
            <v-icon left>mdi-account-edit</v-icon>Rechazar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-card>
  </div>
</template>

<script>

import BookingIntent from "@/models/booking-intent";
import UserService from "@/services/user-service";

export default {
  name: "view-booking-intent",
  data(){
    return {
      id: this.$route.params.id,
      booking: BookingIntent,
    }
  },
  methods: {
    retrieveBooking() {
      UserService.getBookingIntentById(this.id).then(
          response => {
            this.booking = response.data;
          })
          .catch((e) => {
            console.log(e);
          });
    },
    updateBooking(id, value){
      UserService.updateBookingIntents(id, value)
          .then(() => {
            this.navigateToBooking();
          })
          .catch((e) => {
            console.log(e);
          });
    },
    navigateToBooking(){
      this.$router.push({name: 'view-booking-intents'});
    },
    formatDate (date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
  },
  mounted(){
    this.retrieveBooking();
  }
}
</script>

<style scoped>
.top {
  margin-top: 4em;
  border-radius: 20px;
  padding-bottom: 2.5em;
}
</style>
