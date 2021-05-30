<template>
  <div>
    <v-card class="mx-auto top" max-width="800" elevation="0">
      <v-card-title>
        <div class="mt-2 mx-auto title-subjects">
          Intento de Reserva N°{{id}}
        </div>
      </v-card-title>
      <v-card class="mx-auto" max-width="720" elevation="0">
        <v-row>
          <v-col cols="12" sm="6">
            <v-card-title>Dia del Intento</v-card-title>
            <v-card-subtitle>{{formatDate(booking.resource.intentDate.split("T")[0])}}</v-card-subtitle>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-card-title>Inicia</v-card-title>
            <v-card-subtitle>{{formatDate(booking.resource.reservationProposedStartDate.split("T")[0])}}</v-card-subtitle>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card-title>Acaba</v-card-title>
            <v-card-subtitle>{{formatDate(booking.resource.reservationProposedEndDate.split("T")[0])}}</v-card-subtitle>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" sm="6">
            <v-card-title>Estado</v-card-title>
            <v-card-subtitle v-if="booking.resource.bookingIntentState === 0">Pendiente</v-card-subtitle>
            <v-card-subtitle v-else-if="booking.resource.bookingIntentState === 1">Aceptado</v-card-subtitle>
            <v-card-subtitle v-else-if="booking.resource.bookingIntentState === 2">Rechazado</v-card-subtitle>
            <v-card-subtitle v-else-if="booking.resource.bookingIntentState === 3">Cancelado</v-card-subtitle>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card-title>
              <a id="view-post" class="post" v-if="booking.resource.bookingIntentState === 0"
                 @click="$router.push(`/posts/${booking.resource.postId}`)">
                Ver Post
              </a>
            </v-card-title>
          </v-col>
        </v-row>
        <v-card-actions v-if="booking.resource.bookingIntentState === 0 && booking.resource.userId !== 2"><!--de momento 2 para no mostrarle las opciones de admin a este usuario // falta authentication-->
          <v-btn @click="updateBooking(id, true)" width="50%" color="#226bdd"
                 style="color: white; border-radius: 10px">
            <v-icon left>mdi-check</v-icon>Aceptar
          </v-btn>
          <v-btn @click="updateBooking(id, false)" width="50%" color="#393e4e"
                 style="color: white; border-radius: 10px">
            <v-icon left>mdi-cancel</v-icon>Rechazar
          </v-btn>
        </v-card-actions>
        <v-card-actions v-if="booking.resource.userId === 2 && booking.resource.bookingIntentState === 0">
          <v-btn @click="cancelBooking(id)" block color="#393e4e"
                 style="color: white; border-radius: 10px">
            <v-icon left>mdi-cancel</v-icon>Cancelar
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
      date: '2021-08-29',
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
    cancelBooking(id){
      UserService.cancelBookingIntentById(id)
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
.post {
  color: inherit;
}
</style>
