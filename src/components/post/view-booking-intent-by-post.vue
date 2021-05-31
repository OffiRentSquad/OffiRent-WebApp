<template>
  <v-card class="mx-auto top" style="border-radius: 10px" max-width="800">
    <v-card-title class="justify-center font-weight-light title-booking">
      Mis Intentos de Reserva</v-card-title>
    <v-divider></v-divider>
    <v-data-table :headers="headers" :items="displayBooking" :items-per-page="5">
      <template v-slot:[`item.actions`]="{ item }">
        <v-chip id="view-booking-intent" @click="$router.push(`/booking-intent/${item.id}`)"
                class="details" text-color="#fff" color="#226bdd">Ver más
          <v-icon right>mdi-arrow-right-circle</v-icon>
        </v-chip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import BookingIntent from "@/models/booking-intent";
import UserService from "@/services/user-service";

export default {
  data() {
    return {
      id: this.$route.params.id,
      bookingIntent: BookingIntent,
      displayBooking: [],
      headers: [
        {text: 'Id', value: 'id'},
        {text: 'Dia del Intento', value: 'intentDate'},
        {text: 'Inicia', value: 'reservationProposedStartDate'},
        {text: 'Acaba', value: 'reservationProposedEndDate'},
        {text: 'Acciones', value: 'actions', sortable: false},
      ]
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    getAllBookingIntents(){
      UserService.getAllBookingIntentsByPostId(this.id).then(
          response => {
            this.bookingIntent = response.data;
            this.displayBooking = response.data.map(this.getDisplayBooking);
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
        reservationProposedEndDate: this.formatDate(booking.reservationProposedEndDate.split("T")[0])
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
    this.getAllBookingIntents();
  }
}
</script>

<style scoped>
.top {
  margin-top: 4em;
  border-radius: 20px;
}
.title-booking{
  font-size: 27px;
  margin-top: 2.5em;
}
@media screen and (max-width: 690px) {
  .title-booking{
    font-size: 27px;
    margin-top: 1em;
  }
}
.details {
  margin-left: -1em;
}
@media screen and (max-width: 900px) {
  .details {
    margin-left: 0;
  }
}
</style>
