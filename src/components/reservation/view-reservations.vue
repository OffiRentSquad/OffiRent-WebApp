<template>
  <v-card elevation="0" style="border-radius: 10px">
    <v-tabs centered class="pt-8">
      <v-tab>
        <v-icon left>mdi-calendar-blank</v-icon>
        Activas
      </v-tab>
      <v-tab>
        <v-icon left>mdi-calendar-refresh</v-icon>
        Historial
      </v-tab>
      <v-tab-item>
        <v-card class="mx-auto mt-8" flat max-width="900">
          <v-data-table :headers="headers" :items="displayActiveReservations" :items-per-page="5">
            <template v-slot:[`item.userId`]="{ item }">
              <v-chip @click="$router.push(`/users/${item.userId}`)"
                      class="button" text-color="#fff" color="#226bdd">Ver más
                <v-icon right>mdi-arrow-right-circle</v-icon>
              </v-chip>
            </template>
            <template v-slot:[`item.officeId`]="{ item }">
              <v-chip @click="$router.push(`/offices/${item.officeId}`)"
                      class="button" text-color="#fff" color="#226bdd">Ver más
                <v-icon right>mdi-arrow-right-circle</v-icon>
              </v-chip>
            </template>
          </v-data-table>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card class="mx-auto mt-8" flat max-width="800">
          <v-data-table :headers="headers" :items="displayRecordOfReservations" :items-per-page="5">
            <template v-slot:[`item.userId`]="{ item }">
              <v-chip @click="$router.push(`/users/${item.userId}`)"
                      class="button" text-color="#fff" color="#226bdd">Ver más
                <v-icon right>mdi-arrow-right-circle</v-icon>
              </v-chip>
            </template>
            <template v-slot:[`item.officeId`]="{ item }">
              <v-chip @click="$router.push(`/offices/${item.officeId}`)"
                      class="button" text-color="#fff" color="#226bdd">Ver más
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
import UserService from "@/services/user-service";
import Reservation from "@/models/reservation";
import Office from "@/models/office";

export default {
  name: "view-reservations",
  data() {
    return {
      tab: null,
      office: Office,
      reservation: Reservation,
      displayActiveReservations: [],
      displayRecordOfReservations: [],
      headers: [
        {text: 'Inicia', value: 'startTime'},
        {text: 'Acaba', value: 'endTime'},
        {text: 'Dueño', value: 'userId', sortable: false},
        {text: 'Oficina', value: 'officeId', sortable: false},
      ]
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  },
  methods: {
    getReservations(reservation){
      return {
        startTime: this.formatDate(reservation.startTime.split("T")[0]),
        endTime: this.formatDate(reservation.endTime.split("T")[0]),
        userId: reservation.office.userId,
        officeId: reservation.office.id,
      }
    },
    getAllActiveReservations(){
      UserService.getActiveReservationsByUserId(this.currentUser.id).then(
          response => {
            this.reservation = response.data;
            this.displayActiveReservations = response.data.map(this.getReservations);
          })
          .catch((e) => {
            console.log(e);
          });
    },
    getRecordOfReservation(){
      UserService.getRecordOfReservationsByUserId(this.currentUser.id).then(
          response => {
            this.reservation = response.data;
            this.displayRecordOfReservations = response.data.map(this.getReservations);
          })
          .catch((e) => {
            console.log(e);
          });
    },
    formatDate (date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },

  },
  mounted() {
    if (!this.currentUser) {
      this.$router.push('/login');
    }
    this.getAllActiveReservations();
    this.getRecordOfReservation();
  },

}
</script>

<style scoped>
.button{
  margin-left: -1em;
}
@media screen and (max-width: 599px) {
  .button{
    margin-left: 0;
  }
}
</style>
