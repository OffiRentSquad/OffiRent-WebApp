<template>
  <v-card elevation="0" style="border-radius: 10px">
    <v-tabs centered class="pt-8">
      <v-tab>
        <v-icon left>mdi-send</v-icon>
        Enviados
      </v-tab>
      <v-tab>
        <v-icon left>mdi-history</v-icon>
        Historial
      </v-tab>
      <v-tab-item>
        <v-card class="mx-auto mt-8" flat max-width="800">
          <v-data-table :headers="headers2" :items="displaySendBooking" :items-per-page="5">
            <template v-slot:[`item.details`]="{ item }">
              <v-chip @click="$router.push(`/booking-intent/${item.id}`)"
                      text-color="#fff" color="#226bdd">Ver más
                <v-icon right>mdi-arrow-right-circle</v-icon>
              </v-chip>
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card class="mx-auto mt-8" flat max-width="800">
          <v-data-table :headers="headers2" :items="displayRecordBookings" :items-per-page="5">
            <template v-slot:[`item.details`]="{ item }">
              <v-chip @click="$router.push(`/booking-intent/${item.id}`)"
                      text-color="#fff" color="#226bdd">Ver más
                <v-icon right>mdi-arrow-right-circle</v-icon>
              </v-chip>
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>

import BookingIntent from "@/models/booking-intent";
import UserService from "@/services/user-service";

export default {
  name: "view-booking-intents",
  data() {
    return {
      bookingIntent: BookingIntent,
      displaySendBooking: [],
      displayRecordBookings: [],
      headers: [
        {text: 'Id', value: 'id'},
        {text: 'Dia del Intento', value: 'intentDate'},
        {text: 'Inicia', value: 'reservationProposedStartDate'},
        {text: 'Acaba', value: 'reservationProposedEndDate'},
        {text: 'Acciones', value: 'actions', sortable: false},
      ],
      headers2: [
        {text: 'Id', value: 'id'},
        {text: 'Dia del Intento', value: 'intentDate'},
        {text: 'Inicia', value: 'reservationProposedStartDate'},
        {text: 'Acaba', value: 'reservationProposedEndDate'},
        {text: 'Detalles', value: 'details', sortable: false},
      ]
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    getAllSendBookingIntents(){
      UserService.getSendBookingIntentsByUserId(this.currentUser.id).then(
          response => {
            this.bookingIntent = response.data;
            this.displaySendBooking = response.data.map(this.getDisplayBooking);
          })
          .catch((e) => {
            console.log(e);
          });
    },
    getRecordBookingIntents(){
      UserService.getRecordBookingIntentByUserId(this.currentUser.id).then(
          response => {
            this.bookingIntent = response.data;
            this.displayRecordBookings = response.data.map(this.getDisplayBooking);
          })
          .catch((e) => {
            console.log(e);
          });
    },
    getDisplayBooking(booking){
      return {
        id: booking.id,
        intentDate: this.formatDate(booking.intentDate.split("T")[0]),
        reservationProposedStartDate: this.formatDate(booking.reservationProposedStartDate.split("T")[0]),
        reservationProposedEndDate: this.formatDate(booking.reservationProposedEndDate.split("T")[0]),
      }
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
    this.getAllSendBookingIntents();
    this.getRecordBookingIntents();
  }
}
</script>

<style scoped>

</style>
