<template>
  <div>
    <v-card class="mx-auto top" style="border-radius: 10px" max-width="800">
      <v-card-title class="justify-center font-weight-light title">
        Mis Reservas</v-card-title>
      <v-divider></v-divider>

      <v-data-table :headers="headers" :items="displayBooking" :items-per-page="5" locale="es-ES"
                    class="" style="font-size: 18px;">
        <template v-slot:[`item.actions`]="{ item }">
          <v-chip @click="$router.push(`/booking-intent/${item.id}`)"
                  class="details" text-color="#fff" color="#226bdd">Ver más
            <v-icon right>mdi-arrow-right-circle</v-icon>
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
export default {
name: "view-reservations"
}
</script>

<style scoped>
.top {
  margin-top: 4em;
}
.title{
  font-size: 27px;
  margin-top: 2.5em;
}
@media screen and (max-width: 690px) {
  .title{
    font-size: 27px;
    margin-top: 1em;
  }
}
@media screen and (max-width: 580px) {
  .top {
    margin-top: 0;
  }
}
</style>
