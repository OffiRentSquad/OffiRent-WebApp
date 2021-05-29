<template>
  <div>
    <v-card class="mx-auto top" max-width="800" elevation="0">
      <v-card-title>
        <div class="mt-2 mx-auto title-subjects">
          Intento de Reserva N°{{id}}
        </div>
      </v-card-title>
      <v-card  class="mx-auto" max-width="720" elevation="0">
        <v-card-title>Dia del Intento</v-card-title>
        <v-card-subtitle>{{formatDate(booking.resource.intentDate.split("T")[0])}}</v-card-subtitle>
        <v-card-title>Inicia</v-card-title>
        <v-card-subtitle>{{formatDate(booking.resource.reservationProposedStartDate.split("T")[0])}}</v-card-subtitle>
        <v-card-title>Acaba</v-card-title>
        <v-card-subtitle>{{formatDate(booking.resource.reservationProposedEndDate.split("T")[0])}}</v-card-subtitle>
        <v-card-title>Estado</v-card-title>
        <v-card-subtitle v-if="booking.resource.bookingIntentState === 0">Pendiente</v-card-subtitle>
        <v-card-subtitle v-else-if="booking.resource.bookingIntentState === 1">Aceptado</v-card-subtitle>
        <v-card-subtitle v-else-if="booking.resource.bookingIntentState === 2">Rechazado</v-card-subtitle>
        <v-card-subtitle v-else-if="booking.resource.bookingIntentState === 3">Cancelado</v-card-subtitle>
        <v-card-subtitle>
          <v-btn v-if="booking.resource.bookingIntentState === 0 ||
                                    booking.resource.bookingIntentState === 2" @click="$router.push(`/posts/${booking.resource.postId}`)" class="mt-2" color="#226bdd" style="color: white; border-radius: 10px">
            Ver Post
          </v-btn>
        </v-card-subtitle>
        <v-card-actions v-if="booking.resource.userId !== 1"><!--de momento 2 para no mostrarle las opciones de admin a este usuario // falta authentication-->
          <v-btn @click="updateBooking(id, true)" rounded block class="mt-4" color="#226bdd" style="color: white;">
            <v-icon left>mdi-account-edit</v-icon>Aceptar
          </v-btn>
        </v-card-actions>
        <v-card-actions v-if="booking.resource.userId !== 1">
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
  border-radius: 10px;
  padding-bottom: 2.5em;
}
@media screen and (max-width: 580px) {
  .top{
    margin-top: 0;
  }
}
</style>
